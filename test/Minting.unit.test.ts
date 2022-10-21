/* eslint-disable no-console, no-restricted-syntax, guard-for-in, no-await-in-loop */
import { Client, NftId, TokenId } from '@hashgraph/sdk';
import { initClient, setClientOperator } from './utils/clientHelper';
import {
  createToken,
  createTokenAndMintMultipleNfts,
  CreateTokenAndMintMultipleNFTsData,
  getContractIdFromAddress,
  getNftInfo,
  getTokenInformation,
  mintMultipleNfts,
  MintMultipleNFTsData,
  mintNft,
  MintNFTData,
} from './utils/hashgraphQueries';
import MintingContractAbiWrapper from '../build/contracts/Minting.json';

const { abi: MintingContractAbi } = MintingContractAbiWrapper;

const Minting = artifacts.require('Minting');

contract('Minting', () => {
  let client: Client;
  before(() => {
    client = initClient();
  });
  after(() => {
    client.close();
  });

  it('creates a valid token with the sender as treasurer and auto-renew-account', async () => {
    setClientOperator(
      '0.0.1022',
      '0xa608e2130a0a3cb34f86e757303c862bee353d9ab77ba4387ec084f881d420d4',
      client
    );

    await Minting.deployed();

    let tokenInfo;
    const tokenData = {
      name: 'Fall Collection',
      symbol: 'LEAF',
      maxSupply: 250,
      memo: 'Just a memo',
    };

    let error;
    try {
      const contractId = await getContractIdFromAddress(Minting.address);
      const [tokenIdString] = await createToken(
        contractId,
        tokenData,
        client,
        MintingContractAbi
      );

      tokenInfo = await getTokenInformation(tokenIdString, client);
    } catch (err) {
      console.log('Cought error: ', err);
      error = err;
    }
    assert.notExists(error);

    assert.equal(
      client.operatorAccountId!.toString(),
      tokenInfo?.treasuryAccountId?.toString()
    );
    assert.equal(
      client.operatorAccountId!.toString(),
      tokenInfo?.autoRenewAccountId?.toString()
    );
    assert.equal(tokenData.name, tokenInfo?.name);
    assert.equal(tokenData.symbol, tokenInfo?.symbol);
    assert.equal(
      tokenData.maxSupply.toString(),
      tokenInfo?.maxSupply?.toString()
    );
  });

  it('mints an nft on the provided token and assigns it to the sender', async () => {
    const [operatorId] = setClientOperator(
      '0.0.1022',
      '0xa608e2130a0a3cb34f86e757303c862bee353d9ab77ba4387ec084f881d420d4',
      client
    );

    const contractId = await getContractIdFromAddress(Minting.address);

    const tokenData = {
      name: 'Fall Collection',
      symbol: 'LEAF',
      maxSupply: 250,
      memo: 'Just a memo',
    };
    const [tokenId, tokenSolidityAddr] = await createToken(
      contractId,
      tokenData,
      client,
      MintingContractAbi
    );

    const mintNftData: MintNFTData = {
      metadata: [
        Buffer.from(
          'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
        ),
      ],
      tokenSolidityAddr,
    };
    let error;
    try {
      const serial = await mintNft(contractId, mintNftData, client);
      const nftId = new NftId(TokenId.fromString(tokenId), serial.toNumber());
      const info = await getNftInfo(nftId, client);

      assert.equal(operatorId.toString(), info.accountId.toString());
      assert.equal(
        mintNftData.metadata[0].toString(),
        info.metadata?.toString()
      );
    } catch (err) {
      console.log('Cought error: ', err);
      error = err;
    }
    assert.notExists(error);
  });

  it('mints multiple nfts on the provided token and assigns it to the sender', async () => {
    const [operatorId] = setClientOperator(
      '0.0.1022',
      '0xa608e2130a0a3cb34f86e757303c862bee353d9ab77ba4387ec084f881d420d4',
      client
    );

    const contractId = await getContractIdFromAddress(Minting.address);

    const tokenData = {
      name: 'Fall Collection',
      symbol: 'LEAF',
      maxSupply: 250,
      memo: 'Just a memo',
    };
    const [tokenId, tokenSolidityAddr] = await createToken(
      contractId,
      tokenData,
      client,
      MintingContractAbi
    );

    const mintNftData: MintMultipleNFTsData = {
      metadata: [
        Buffer.from(
          'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
        ),
        Buffer.from(
          'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
        ),
        Buffer.from(
          'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
        ),
        Buffer.from(
          'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
        ),
        Buffer.from(
          'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
        ),
      ],
      tokenSolidityAddr,
    };
    let error;
    try {
      await mintMultipleNfts(contractId, mintNftData, client);

      for (const nft in mintNftData.metadata) {
        const nftId = new NftId(TokenId.fromString(tokenId), +nft + 1);
        const info = await getNftInfo(nftId, client);
        assert.equal(operatorId.toString(), info.accountId.toString());
        assert.equal(
          mintNftData.metadata[0].toString(),
          info.metadata?.toString()
        );
      }
    } catch (err) {
      console.log('Cought error: ', err);
      error = err;
    }
    assert.notExists(error);
  });

  it('creates a token and mints multiple nfts in one call', async () => {
    const [operatorId] = setClientOperator(
      '0.0.1022',
      '0xa608e2130a0a3cb34f86e757303c862bee353d9ab77ba4387ec084f881d420d4',
      client
    );

    const contractId = await getContractIdFromAddress(Minting.address);

    const createTokenAndMintMultipleNFTsData: CreateTokenAndMintMultipleNFTsData =
      {
        name: 'Fall Collection',
        symbol: 'LEAF',
        maxSupply: 250,
        memo: 'Just a memo',
        metadata: [
          Buffer.from(
            'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
          ),
          Buffer.from(
            'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
          ),
          Buffer.from(
            'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
          ),
          Buffer.from(
            'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
          ),
          Buffer.from(
            'ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json'
          ),
        ],
      };

    let error;
    try {
      const [tokenId] = await createTokenAndMintMultipleNfts(
        contractId,
        createTokenAndMintMultipleNFTsData,
        client,
        MintingContractAbi
      );

      for (const nft in createTokenAndMintMultipleNFTsData.metadata) {
        const nftId = new NftId(TokenId.fromString(tokenId), +nft + 1);
        const info = await getNftInfo(nftId, client);
        assert.equal(operatorId.toString(), info.accountId.toString());
        assert.equal(
          createTokenAndMintMultipleNFTsData.metadata[0].toString(),
          info.metadata?.toString()
        );
      }
    } catch (err) {
      console.log('Cought error: ', JSON.stringify(err));
      error = err;
    }
    assert.notExists(error);
  });
});
