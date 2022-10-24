import {
  AccountId,
  Client,
  ContractCreateFlow,
  PrivateKey,
} from '@hashgraph/sdk';
import * as dotenv from 'dotenv';
import MintingContractFile from '../build/contracts/Minting.json';

dotenv.config();

const operatorId = AccountId.fromString(process.env.OPERATOR_ID!);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY!);
const client = Client.forMainnet().setOperator(operatorId, operatorKey);

async function createSC() {
  const contractBytecode = MintingContractFile.bytecode;

  const contractInstantiateTx = new ContractCreateFlow()
    .setGas(15_000_000)
    .setBytecode(contractBytecode);
  const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
  const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
    client
  );
  const { contractId } = contractInstantiateRx;
  const contractAddress = contractId!.toSolidityAddress();
  console.log('CONTRACT SOL ADDRESS: ', contractAddress);
}

async function main() {
  await createSC();
}
main().catch((error) => console.log(error));
