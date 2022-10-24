import {
  AccountId,
  ContractExecuteTransaction,
} from '@hashgraph/sdk';
import axios, { AxiosResponse } from 'axios';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import Web3 from 'web3';
import getTransactionReceipt from './getTransactionReceipt';
import MintingContractAbiWrapper from '../build/contracts/Minting.json';

const { abi: MintingContractAbi } = MintingContractAbiWrapper;

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
  hashconnect?: HashConnect | null
) {
  try {
    let hc = hashconnect;
    if (!hc) {
      [hc] = await initHashConnect();
    }

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
      operations.push(
        axios.post('/api/uploadMetadataToIPFS', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    }
    const responses = await Promise.all(operations);

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
        'TEST',
        maxSupply.toString(),
        '7000000',
        metadataUInt8Array,
        royalties,
      ],
      MintingContractAbi
    );

    const mintNftRequest = new ContractExecuteTransaction()
      .setContractId('0.0.1377616')
      .setGas(2500000)
      .setPayableAmount(500)
      .setFunctionParameters(encodedFunctionCall);

    hc!.connectToLocalWallet();

    return await new Promise((resolve, reject) => {
      hc!.pairingEvent.once(async (pairingData) => {
        try {
          const provider = hc!.getProvider(
            'mainnet',
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

          resolve(receipt?.status.valueOf());
        } catch (err) {
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
