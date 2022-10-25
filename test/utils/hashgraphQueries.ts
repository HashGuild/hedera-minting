import Web3 from 'web3';
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
export type MintMultipleNFTsData = {
  tokenSolidityAddr: string;
  metadata: Buffer[];
};
export type CreateTokenData = {
  name: string;
  symbol: string;
  maxSupply: number;
  memo: string;
};
export type CreateTokenAndMintMultipleNFTsData = CreateTokenData & {
  metadata: Buffer[];
};

export async function getContractIdFromAddress(address: string) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5551/api/v1/contracts/${address}`
    );

    if (res.status !== 200) {
      throw Error("Something went wrong while fetching the contract's ID.");
    }

    return res.data.contract_id;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(
        `Something went wrong while fetching the contract's ID: ${error.message}`
      );
    }
    throw error;
  }
}

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

export async function getTokenInformation(tokenId: string, client: Client) {
  const query = new TokenInfoQuery().setTokenId(tokenId);
  const res = await query.execute(client);
  return res;
}

export async function createToken(
  contractId: string,
  data: CreateTokenData,
  client: Client,
  abi: any[]
) {
  const encodedFunctionCall = encodeFunctionCall(
    'createNft',
    [
      data.name,
      data.symbol,
      data.maxSupply.toString(),
      '7000000',
      [
        {
          numerator: '10',
          denominator: '100',
          feeCollector: client.operatorAccountId!.toSolidityAddress(),
        },
        {
          numerator: '20',
          denominator: '100',
          feeCollector: AccountId.fromString('0.0.2').toSolidityAddress(),
        },
      ],
    ],
    abi
  );
  const createTokenRequest = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2500000)
    .setPayableAmount(20)
    .setFunctionParameters(encodedFunctionCall);
  const createTokenTx = await createTokenRequest.execute(client);
  const createTokenRx = await createTokenTx.getRecord(client);

  const tokenSolidityAddr = createTokenRx.contractFunctionResult!.getAddress(0);
  const tokenIdSolidityAddr =
    createTokenRx.contractFunctionResult!.getAddress(0);
  const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);
  return [tokenId.toString(), tokenSolidityAddr];
}

export async function mintNft(
  contractId: string,
  data: MintNFTData,
  client: Client
) {
  const mintNftRequest = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2500000)
    .setFunction(
      'mintNft',
      new ContractFunctionParameters()
        .addAddress(data.tokenSolidityAddr)
        .addBytesArray(data.metadata)
    );
  const mintNftTx = await mintNftRequest.execute(client);
  const mintNftRx = await mintNftTx.getRecord(client);
  const serial = mintNftRx.contractFunctionResult!.getInt64(0);
  return serial;
}

export async function mintMultipleNfts(
  contractId: string,
  data: MintMultipleNFTsData,
  client: Client
) {
  const mintNftRequest = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(data.metadata.length * 2500000)
    .setFunction(
      'mintMultipleNfts',
      new ContractFunctionParameters()
        .addAddress(data.tokenSolidityAddr)
        .addBytesArray(data.metadata)
    );
  const mintNftTx = await mintNftRequest.execute(client);
  await mintNftTx.getRecord(client);
}

export async function createTokenAndMintMultipleNfts(
  contractId: string,
  data: CreateTokenAndMintMultipleNFTsData,
  client: Client,
  abi: any[]
) {
  const encodedFunctionCall = encodeFunctionCall(
    'createTokenAndMintMultipleNfts',
    [
      data.name,
      data.symbol,
      data.maxSupply.toString(),
      '7000000',
      data.metadata,
      [],
    ],
    abi
  );
  const mintNftRequest = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(data.metadata.length * 2500000)
    .setPayableAmount(20)
    .setFunctionParameters(encodedFunctionCall);
  const mintMultipleNftsTx = await mintNftRequest.execute(client);
  const mintMultipleNftsRx = await mintMultipleNftsTx.getRecord(client);
  const tokenSolidityAddr =
    mintMultipleNftsRx.contractFunctionResult!.getAddress(0);
  const tokenId = AccountId.fromSolidityAddress(tokenSolidityAddr);
  return [tokenId.toString(), tokenSolidityAddr];
}

export async function getNftInfo(nftId: NftId, client: Client) {
  const info = await new TokenNftInfoQuery().setNftId(nftId).execute(client);
  if (!info.length) throw new Error('No info on NFT available.');
  return info[0];
}
