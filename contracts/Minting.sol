// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../hedera-smart-contracts/contracts/hts-precompile/HederaTokenService.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/IHederaTokenService.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/HederaResponseCodes.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/ExpiryHelper.sol";

struct RoyaltyFeeData {
    uint32 numerator;
    uint32 denominator;
    address feeCollector;
}

contract Minting is ExpiryHelper {
    function createNft(
        string memory name,
        string memory symbol,
        int64 maxSupply,
        uint32 autoRenewPeriod,
        RoyaltyFeeData[] memory royaltyFeesData
    ) public payable returns (address) {
        IHederaTokenService.TokenKey[]
            memory keys = new IHederaTokenService.TokenKey[](1);

        keys[0] = getSingleKey(
            KeyType.SUPPLY,
            KeyValueType.CONTRACT_ID,
            address(this)
        );

        IHederaTokenService.HederaToken memory token;
        token.name = name;
        token.symbol = symbol;
        token.treasury = msg.sender;
        token.tokenSupplyType = true;
        token.maxSupply = maxSupply;
        token.tokenKeys = keys;
        token.freezeDefault = false;
        token.expiry = createAutoRenewExpiry(msg.sender, autoRenewPeriod);

        // Create royalty fees
        IHederaTokenService.RoyaltyFee[]
            memory royaltyFees = new IHederaTokenService.RoyaltyFee[](royaltyFeesData.length);
        for (uint32 i = 0; i < royaltyFeesData.length; ++i) {
            IHederaTokenService.RoyaltyFee memory fee;
            fee.numerator = royaltyFeesData[i].numerator;
            fee.denominator = royaltyFeesData[i].denominator;
            fee.feeCollector = royaltyFeesData[i].feeCollector;
            royaltyFees[i] = fee;
        }

        IHederaTokenService.FixedFee[]
            memory fixedFees = new IHederaTokenService.FixedFee[](0);
        (int256 responseCode, address createdToken) = HederaTokenService
            .createNonFungibleTokenWithCustomFees(
                token,
                fixedFees,
                royaltyFees
            );

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert("Failed to create non-fungible token.");
        }
        return createdToken;
    }

    function mintNft(address token, bytes[] memory metadata)
        public
        returns (int64)
    {
        (int256 response, , int64[] memory serials) = HederaTokenService
            .mintToken(token, 0, metadata);

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Failed to mint non-fungible token.");
        }
        return serials[0];
    }

    function mintMultipleNfts(address token, bytes[] memory metadataList)
        public
        returns (int64[] memory)
    {
        int64[] memory serials = new int64[](metadataList.length);
        bytes[] memory currentMetadata = new bytes[](1);
        for (uint256 i = 0; i < metadataList.length; ++i) {
            currentMetadata[0] = metadataList[i];
            serials[i] = mintNft(token, currentMetadata);
        }
        return serials;
    }

    function createTokenAndMintMultipleNfts(
        string memory name,
        string memory symbol,
        int64 maxSupply,
        uint32 autoRenewPeriod,
        bytes[] memory metadataList,
        RoyaltyFeeData[] memory royaltyFees
    ) external payable returns (address tokenId) {
        tokenId = createNft(
            name,
            symbol,
            maxSupply,
            autoRenewPeriod,
            royaltyFees
        );
        mintMultipleNfts(tokenId, metadataList);
        return tokenId;
    }
}
