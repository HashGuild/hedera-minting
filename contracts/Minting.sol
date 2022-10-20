// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../hedera-smart-contracts/contracts/hts-precompile/HederaTokenService.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/IHederaTokenService.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/HederaResponseCodes.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/ExpiryHelper.sol";

contract Minting is ExpiryHelper {
    // /**
    //  * Creates a new fungible token with the provided name, symbol, supply, renewPeriod and royalty fees
    //  *
    //  * @param royaltyFeePairs - A uint32 array of royalty fee nominators mapped to receiver addresses.
    //  *                          The first 160 bits represent the receiver address, the remaining 96 represent the numerator.
    //  */
    function createNft(
        string memory name,
        string memory symbol,
        int64 maxSupply,
        uint32 autoRenewPeriod
        // uint256[] memory royaltyFeePairs
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

        IHederaTokenService.RoyaltyFee memory myFee;
        myFee.numerator = 100;
        myFee.denominator = 1000;
        myFee.feeCollector = msg.sender;

        IHederaTokenService.RoyaltyFee[]
            memory royaltyFees = new IHederaTokenService.RoyaltyFee[](1);
        royaltyFees[0] = myFee;
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
        bytes[] memory metadataList
    ) external payable returns (address tokenId) {
        tokenId = createNft(name, symbol, maxSupply, autoRenewPeriod);
        mintMultipleNfts(tokenId, metadataList);
        return tokenId;
    }
}
