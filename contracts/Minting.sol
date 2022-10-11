// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../hedera-smart-contracts/contracts/hts-precompile/HederaTokenService.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/IHederaTokenService.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/HederaResponseCodes.sol";
import "../hedera-smart-contracts/contracts/hts-precompile/ExpiryHelper.sol";

contract Minting is ExpiryHelper {
    event Error(string message, int256 code);

    function hello() external pure returns (string memory) {
        return "Hello, World";
    }

    function createNft(
        string memory name,
        string memory symbol,
        string memory memo,
        int64 maxSupply,
        uint32 autoRenewPeriod
    ) external returns (address) {
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
        token.memo = memo;
        token.treasury = address(this);
        token.tokenSupplyType = true;
        token.maxSupply = maxSupply;
        token.tokenKeys = keys;
        token.freezeDefault = false;
        token.expiry = createAutoRenewExpiry(address(this), autoRenewPeriod);

        (int256 responseCode, address createdToken) = HederaTokenService.createNonFungibleToken(token);

         if (responseCode != HederaResponseCodes.SUCCESS) {
             revert("Failed to create non-fungible token.");
         }
        return createdToken;
    }

    function mintNft(address token, bytes[] memory metadata)
        external
        returns (int64)
    {
        (int256 response, , int64[] memory serials) = HederaTokenService
            .mintToken(token, 0, metadata);

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Failed to mint non-fungible token.");
        }

        return serials[0];
    }

    function transferNft(
        address token,
        address receiver,
        int64 serial
    ) external returns (int256) {
        HederaTokenService.associateToken(receiver, token);
        int256 response = HederaTokenService.transferNFT(
            token,
            address(this),
            receiver,
            serial
        );

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Failed to transfer non-fungible token.");
        }

        return response;
    }
}
