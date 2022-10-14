/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface MintingContract extends Truffle.Contract<MintingInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MintingInstance>;
}

type AllEvents = never;

export interface MintingInstance extends Truffle.ContractInstance {
  /**
   * Operation to get token expiry info
   * @param token The token address
   */
  getTokenExpiryInfo: {
    (token: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{
      0: BN;
      1: { second: BN; autoRenewAccount: string; autoRenewPeriod: BN };
    }>;
    sendTransaction(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Operation to grant kyc to token account
   * @param account The account address to grant kyc
   * @param token The token address
   */
  grantTokenKyc: {
    (
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Query if token account has kyc granted
   * @param account The account address associated with the token
   * @param token The token address to check
   */
  isKyc: {
    (
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: boolean }>;
    sendTransaction(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Operation to pause token
   * @param token The token address to be paused
   */
  pauseToken: {
    (token: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(token: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
    sendTransaction(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Operation to revoke kyc to token account
   * @param account The account address to revoke kyc
   * @param token The token address
   */
  revokeTokenKyc: {
    (
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Operation to unpause token
   * @param token The token address to be unpaused
   */
  unpauseToken: {
    (token: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(token: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
    sendTransaction(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  updateTokenExpiryInfo: {
    (
      token: string,
      expiryInfo: {
        second: number | BN | string;
        autoRenewAccount: string;
        autoRenewPeriod: number | BN | string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      expiryInfo: {
        second: number | BN | string;
        autoRenewAccount: string;
        autoRenewPeriod: number | BN | string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      token: string,
      expiryInfo: {
        second: number | BN | string;
        autoRenewAccount: string;
        autoRenewPeriod: number | BN | string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      expiryInfo: {
        second: number | BN | string;
        autoRenewAccount: string;
        autoRenewPeriod: number | BN | string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  updateTokenInfo: {
    (
      token: string,
      tokenInfo: {
        name: string;
        symbol: string;
        treasury: string;
        memo: string;
        tokenSupplyType: boolean;
        maxSupply: number | BN | string;
        freezeDefault: boolean;
        tokenKeys: {
          keyType: number | BN | string;
          key: {
            inheritAccountKey: boolean;
            contractId: string;
            ed25519: string;
            ECDSA_secp256k1: string;
            delegatableContractId: string;
          };
        }[];
        expiry: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        };
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      tokenInfo: {
        name: string;
        symbol: string;
        treasury: string;
        memo: string;
        tokenSupplyType: boolean;
        maxSupply: number | BN | string;
        freezeDefault: boolean;
        tokenKeys: {
          keyType: number | BN | string;
          key: {
            inheritAccountKey: boolean;
            contractId: string;
            ed25519: string;
            ECDSA_secp256k1: string;
            delegatableContractId: string;
          };
        }[];
        expiry: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        };
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      token: string,
      tokenInfo: {
        name: string;
        symbol: string;
        treasury: string;
        memo: string;
        tokenSupplyType: boolean;
        maxSupply: number | BN | string;
        freezeDefault: boolean;
        tokenKeys: {
          keyType: number | BN | string;
          key: {
            inheritAccountKey: boolean;
            contractId: string;
            ed25519: string;
            ECDSA_secp256k1: string;
            delegatableContractId: string;
          };
        }[];
        expiry: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        };
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      tokenInfo: {
        name: string;
        symbol: string;
        treasury: string;
        memo: string;
        tokenSupplyType: boolean;
        maxSupply: number | BN | string;
        freezeDefault: boolean;
        tokenKeys: {
          keyType: number | BN | string;
          key: {
            inheritAccountKey: boolean;
            contractId: string;
            ed25519: string;
            ECDSA_secp256k1: string;
            delegatableContractId: string;
          };
        }[];
        expiry: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        };
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  createNft: {
    (
      name: string,
      symbol: string,
      memo: string,
      maxSupply: number | BN | string,
      autoRenewPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      name: string,
      symbol: string,
      memo: string,
      maxSupply: number | BN | string,
      autoRenewPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    sendTransaction(
      name: string,
      symbol: string,
      memo: string,
      maxSupply: number | BN | string,
      autoRenewPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      name: string,
      symbol: string,
      memo: string,
      maxSupply: number | BN | string,
      autoRenewPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  mintNft: {
    (
      token: string,
      metadata: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      token: string,
      metadata: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      token: string,
      metadata: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      token: string,
      metadata: string[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    /**
     * Operation to get token expiry info
     * @param token The token address
     */
    getTokenExpiryInfo: {
      (token: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{
        0: BN;
        1: { second: BN; autoRenewAccount: string; autoRenewPeriod: BN };
      }>;
      sendTransaction(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Operation to grant kyc to token account
     * @param account The account address to grant kyc
     * @param token The token address
     */
    grantTokenKyc: {
      (
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Query if token account has kyc granted
     * @param account The account address associated with the token
     * @param token The token address to check
     */
    isKyc: {
      (
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<{ 0: BN; 1: boolean }>;
      sendTransaction(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Operation to pause token
     * @param token The token address to be paused
     */
    pauseToken: {
      (token: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(token: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
      sendTransaction(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Operation to revoke kyc to token account
     * @param account The account address to revoke kyc
     * @param token The token address
     */
    revokeTokenKyc: {
      (
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        account: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Operation to unpause token
     * @param token The token address to be unpaused
     */
    unpauseToken: {
      (token: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(token: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
      sendTransaction(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    updateTokenExpiryInfo: {
      (
        token: string,
        expiryInfo: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        expiryInfo: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        token: string,
        expiryInfo: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        expiryInfo: {
          second: number | BN | string;
          autoRenewAccount: string;
          autoRenewPeriod: number | BN | string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    updateTokenInfo: {
      (
        token: string,
        tokenInfo: {
          name: string;
          symbol: string;
          treasury: string;
          memo: string;
          tokenSupplyType: boolean;
          maxSupply: number | BN | string;
          freezeDefault: boolean;
          tokenKeys: {
            keyType: number | BN | string;
            key: {
              inheritAccountKey: boolean;
              contractId: string;
              ed25519: string;
              ECDSA_secp256k1: string;
              delegatableContractId: string;
            };
          }[];
          expiry: {
            second: number | BN | string;
            autoRenewAccount: string;
            autoRenewPeriod: number | BN | string;
          };
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        tokenInfo: {
          name: string;
          symbol: string;
          treasury: string;
          memo: string;
          tokenSupplyType: boolean;
          maxSupply: number | BN | string;
          freezeDefault: boolean;
          tokenKeys: {
            keyType: number | BN | string;
            key: {
              inheritAccountKey: boolean;
              contractId: string;
              ed25519: string;
              ECDSA_secp256k1: string;
              delegatableContractId: string;
            };
          }[];
          expiry: {
            second: number | BN | string;
            autoRenewAccount: string;
            autoRenewPeriod: number | BN | string;
          };
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        token: string,
        tokenInfo: {
          name: string;
          symbol: string;
          treasury: string;
          memo: string;
          tokenSupplyType: boolean;
          maxSupply: number | BN | string;
          freezeDefault: boolean;
          tokenKeys: {
            keyType: number | BN | string;
            key: {
              inheritAccountKey: boolean;
              contractId: string;
              ed25519: string;
              ECDSA_secp256k1: string;
              delegatableContractId: string;
            };
          }[];
          expiry: {
            second: number | BN | string;
            autoRenewAccount: string;
            autoRenewPeriod: number | BN | string;
          };
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        tokenInfo: {
          name: string;
          symbol: string;
          treasury: string;
          memo: string;
          tokenSupplyType: boolean;
          maxSupply: number | BN | string;
          freezeDefault: boolean;
          tokenKeys: {
            keyType: number | BN | string;
            key: {
              inheritAccountKey: boolean;
              contractId: string;
              ed25519: string;
              ECDSA_secp256k1: string;
              delegatableContractId: string;
            };
          }[];
          expiry: {
            second: number | BN | string;
            autoRenewAccount: string;
            autoRenewPeriod: number | BN | string;
          };
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    createNft: {
      (
        name: string,
        symbol: string,
        memo: string,
        maxSupply: number | BN | string,
        autoRenewPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        name: string,
        symbol: string,
        memo: string,
        maxSupply: number | BN | string,
        autoRenewPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      sendTransaction(
        name: string,
        symbol: string,
        memo: string,
        maxSupply: number | BN | string,
        autoRenewPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        name: string,
        symbol: string,
        memo: string,
        maxSupply: number | BN | string,
        autoRenewPeriod: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    mintNft: {
      (
        token: string,
        metadata: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        token: string,
        metadata: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        token: string,
        metadata: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        token: string,
        metadata: string[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
