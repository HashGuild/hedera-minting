import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from '@hashgraph/sdk';
import axios, { AxiosResponse } from 'axios';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import getTransactionReceipt from './getTransactionReceipt';

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

    const mintNftRequest = new ContractExecuteTransaction()
      .setContractId(process.env.NEXT_PUBLIC_MINTING_CONTRACT_ID!)
      .setGas(2500000)
      .setPayableAmount(500)
      .setFunction(
        'createTokenAndMintMultipleNfts',
        new ContractFunctionParameters()
          .addString(tokenData.tokenName)
          .addString('TEST')
          // @ts-ignore
          .addInt64(1)
          .addUint32(7000000)
          .addBytesArray(responses.map((res) => Buffer.from(res.data.url)))
      );

    hc!.connectToLocalWallet();

    return await new Promise((resolve, reject) => {
      hc!.pairingEvent.once(async (pairingData) => {
        try {
          const provider = hc!.getProvider(
            'testnet',
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
