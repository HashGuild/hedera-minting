import { AccountId, ContractExecuteTransaction } from '@hashgraph/sdk';
import axios, { AxiosResponse } from 'axios';
import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
import Web3 from 'web3';
import getTransactionReceipt from './getTransactionReceipt';
import MintingContractAbiWrapper from '../build/contracts/Minting.json';
import getTransactionRecord from './getTransactionRecord';

const { abi: MintingContractAbi } = MintingContractAbiWrapper;
const HEDERA_NETWORK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'mainnet' : 'testnet';

function encodeFunctionCall(
  functionName: string,
  parameters: any[],
  abi: any[]
) {
  const web3 = new Web3();
  const functionAbi = abi.find(
    (func) => func.name === functionName && func.type === 'function'
  );
  const encodedParametersHex = web3.eth.abi
    .encodeFunctionCall(functionAbi, parameters)
    .slice(2);
  return Buffer.from(encodedParametersHex, 'hex');
}

class RoyaltyFeeData {
  numerator: string;

  denominator: string;

  feeCollector: string;

  constructor(numerator: number, denominator: number, feeCollector: string) {
    if (numerator >= denominator) {
      throw new Error('Royalty Fee too large.');
    }
    this.numerator = Math.floor(numerator).toString();
    this.denominator = denominator.toString();
    this.feeCollector = feeCollector;
  }
}

export default async function pinFilesAndMint(
  tokenData: any,
  nfts: any[],
  initHashConnect: () => Promise<
    [HashConnect, HashConnectTypes.InitilizationData]
  >,
  hashconnect?: HashConnect | null,
  filesUploadedCallback?: (success: boolean) => unknown
) {
  try {
    let hc = hashconnect;
    if (!hc) {
      [hc] = await initHashConnect();
    }

    let hasDirectListingRequests = false;
    const operations: Promise<AxiosResponse<any, any>>[] = [];
    for (const nft of nfts) {
      const data = new FormData();
      data.set('name', nft.tokenName);
      data.set('creator', nft.creatorName);
      data.set('description', nft.description);
      data.set('thumbnailFile', nft.nftThumbnail!);
      if (nft.nftPropertiesEnabled) {
        data.set('attributes', JSON.stringify(nft.nftProperties));
      }
      for (const file of nft.nftFiles) {
        data.append('files', file);
      }

      if (nft.listingPrice) {
        hasDirectListingRequests = true;
      }
      operations.push(
        axios.post('/api/uploadMetadataToIPFS', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    }
    const responses = await Promise.all(operations);
    if (filesUploadedCallback) {
      filesUploadedCallback(true);
    }

    const royalties = tokenData.royaltyWallets
      .filter(
        (wallet: { fee: number; accountId: string }) =>
          !!wallet.accountId && !!wallet.fee
      )
      .map(
        (wallet: { fee: number; accountId: string }) =>
          new RoyaltyFeeData(
            wallet.fee * 100,
            10000,
            AccountId.fromString(wallet.accountId).toSolidityAddress()
          )
      );
    const maxSupply = responses.length;
    const metadataUInt8Array = responses.map((res) =>
      Buffer.from(res.data.url)
    );

    const encodedFunctionCall = encodeFunctionCall(
      'createTokenAndMintMultipleNfts',
      [
        tokenData.tokenName,
        tokenData.tokenSymbol,
        maxSupply.toString(),
        '7000000',
        metadataUInt8Array,
        royalties,
      ],
      MintingContractAbi
    );

    // Approximate fees
    const approxCustomNftCreateFee = 42;
    const approxNftMintFee = 0.021;
    const feeToSend =
      (approxCustomNftCreateFee + approxNftMintFee * (nfts?.length || 0)) * 1.2;

      const CONTRACT_ID =
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? '0.0.1377616' : '0.0.48679240';
      
    const mintNftRequest = new ContractExecuteTransaction()
      .setContractId(CONTRACT_ID)
      .setGas(2500000)
      .setPayableAmount(feeToSend)
      .setFunctionParameters(encodedFunctionCall);

    hc!.connectToLocalWallet();

    let timedOut = false;
    setTimeout(() => {
      timedOut = true;
      if (filesUploadedCallback) {
        filesUploadedCallback(false);
      }
    }, 60000);
    return await new Promise((resolve, reject) => {
      hc!.pairingEvent.once(async (pairingData) => {
        try {
          if (timedOut) {
            return;
          }
          const provider = hc!.getProvider(
            HEDERA_NETWORK,
            pairingData.topic,
            pairingData.accountIds[0]
          );
          const signer = hc!.getSigner(provider);

          const trans = await mintNftRequest.freezeWithSigner(signer);
          const transExec = (await trans.executeWithSigner(signer)) as any;

          const receipt = await getTransactionReceipt(
            transExec.transactionId,
            provider.client
          );
          if (!hasDirectListingRequests) {
            resolve(receipt?.status.valueOf());
          }
          setTimeout(async () => {
            const record = await getTransactionRecord(transExec.transactionId);
            console.log('My Record:', record);

            const nftTransfers: any[] = record.transactions
              .filter((transaction: any) => transaction.name === 'TOKENMINT')
              .map((transaction: any) => transaction.nft_transfers);

            
              const HG_BASEURI =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://hashguild.xyz/api/' : 'http://localhost:8080/api/';

            const listingOperations = nftTransfers
              .filter((transfer: any) => {
                const index = transfer[0].serial_number - 1;
                console.log(index);
                console.log(nfts[index]);

                return !!nfts[index].listingPrice;
              })
              .map((transfer: any) =>
                fetch(`${HG_BASEURI}listing/list`, {
                  method: 'POST',
                  body: JSON.stringify({
                    tokenId: transfer[0].token_id,
                    serialNo: transfer[0].serial_number,
                    accountId: pairingData.accountIds[0],
                    listingPrice:
                      nfts[transfer[0].serial_number - 1].listingPrice,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
              );

            const results = await Promise.all(listingOperations);
            for (const result of results) {
              const signingData = await result.json();
              const transactionsByteBuffer = Buffer.from(
                signingData.byteArray,
                'base64'
              );
              const transactionInByteArray = new Uint8Array(
                transactionsByteBuffer
              );
              const transaction: MessageTypes.Transaction = {
                topic: pairingData.topic,
                byteArray: transactionInByteArray,
                metadata: {
                  accountToSign: pairingData.accountIds[0],
                  returnTransaction: false,
                },
              };
              const res = await hc!.sendTransaction(
                pairingData.topic,
                transaction
              );
              console.log('TRANSACTION RESULT:', res);
            }

            if (filesUploadedCallback) {
              filesUploadedCallback(true);
            }
            resolve(receipt?.status.valueOf());
          }, 10000);
        } catch (err) {
          if (filesUploadedCallback) {
            filesUploadedCallback(false);
          }
          console.log(err);
          reject(err);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
