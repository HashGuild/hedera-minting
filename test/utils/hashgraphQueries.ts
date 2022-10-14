import {
  AccountId,
  Client,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  NftId,
  TokenInfoQuery,
  TokenNftInfoQuery,
} from '@hashgraph/sdk';
import axios from 'axios';

export type MintNFTData = {
  tokenSolidityAddr: string;
  metadata: Buffer[];
};
export type CreateTokenData = {
  name: string;
  symbol: string;
  maxSupply: number;
  memo: string;
};

export async function getContractIdFromAddress(address: string) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5551/api/v1/contracts/${address}`,
    );

    if (res.status !== 200) {
      throw Error("Something went wrong while fetching the contract's ID.");
    }

    return res.data.contract_id;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(
        `Something went wrong while fetching the contract's ID: ${error.message}`,
      );
    }
    throw error;
  }
}

export async function getTokenInformation(tokenId: string, client: Client) {
  const query = new TokenInfoQuery().setTokenId(tokenId);
  const res = await query.execute(client);
  return res;
}

export async function createToken(
  contractId: string,
  data: CreateTokenData,
  client: Client,
) {
  const createTokenRequest = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2500000)
    .setPayableAmount(500)
    .setFunction(
      'createNft',
      new ContractFunctionParameters()
        .addString(data.name)
        .addString(data.symbol)
        .addString(data.memo)
        // @ts-ignore
        .addInt64(data.maxSupply)
        .addUint32(7000000),
    );
  const createTokenTx = await createTokenRequest.execute(client);
  const createTokenRx = await createTokenTx.getRecord(client);
  const tokenSolidityAddr = createTokenRx.contractFunctionResult!.getAddress(0);
  const tokenIdSolidityAddr = createTokenRx.contractFunctionResult!.getAddress(0);
  const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);
  return [tokenId.toString(), tokenSolidityAddr];
}

export async function mintNft(
  contractId: string,
  data: MintNFTData,
  client: Client,
) {
  const mintNftRequest = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2500000)
    .setFunction(
      'mintNft',
      new ContractFunctionParameters()
        .addAddress(data.tokenSolidityAddr)
        .addBytesArray(data.metadata),
    );
  const mintNftTx = await mintNftRequest.execute(client);
  const mintNftRx = await mintNftTx.getRecord(client);
  const serial = mintNftRx.contractFunctionResult!.getInt64(0);
  return serial;
}

export async function getNftInfo(nftId: NftId, client: Client) {
  const info = await new TokenNftInfoQuery().setNftId(nftId).execute(client);
  if (!info.length) throw new Error('No info on NFT available.');
  return info[0];
}
