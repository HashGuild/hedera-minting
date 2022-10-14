/* eslint-disable no-console */
import {
  AccountId,
  Client,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  PrivateKey,
} from '@hashgraph/sdk';

const operatorId = AccountId.fromString('0.0.2');
const operatorKey = PrivateKey.fromString(
  '302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137',
);
const node = { '127.0.0.1:50211': new AccountId(3) };
const client = Client.forNetwork(node).setMirrorNetwork('127.0.0.1:5600');
client.setOperator(operatorId, operatorKey);

async function main() {
  try {
    const createToken = new ContractExecuteTransaction()
      .setContractId('0.0.1058')
      .setGas(1500000)
      .setPayableAmount(100)
      .setFunction(
        'createNft',
        new ContractFunctionParameters()
          .addString('Fall Collection')
          .addString('LEAF')
          .addString('Just a memo')
          // @ts-ignore
          .addInt64(250)
          .addUint32(7000000),
      );
    const createTokenTx = await createToken.execute(client);
    const createTokenRx = await createTokenTx.getRecord(client);
    const tokenIdSolidityAddr = createTokenRx.contractFunctionResult!.getAddress(0);
    const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);

    console.log('Token created with ID: ', tokenId.toString());
  } catch (error) {
    console.log(error);
  }
}

main();
