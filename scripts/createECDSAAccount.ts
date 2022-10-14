/* eslint-disable no-console */
import {
  AccountId,
  Client,
  Hbar,
  PrivateKey,
  PublicKey,
  TransactionRecord,
  TransactionReceipt,
  TransactionRecordQuery,
  TransferTransaction,
} from '@hashgraph/sdk';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const operatorId = AccountId.fromString('0.0.2');
const operatorKey = PrivateKey.fromString(
  '302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137',
);
// const client = Client.forTestnet().setOperator(operatorId, operatorKey);
const node = { '127.0.0.1:50211': new AccountId(3) };
const client = Client.forNetwork(node).setMirrorNetwork('127.0.0.1:5600');
client.setOperator(operatorId, operatorKey);

async function autoCreateAccountFcn(
  senderAccountId: AccountId,
  receiverAccountId: AccountId,
  hbarAmount: string | number,
): Promise<[TransactionReceipt, TransactionRecord]> {
  // Transfer hbar to the account alias to auto-create account
  const transferToAliasTx = new TransferTransaction()
    .addHbarTransfer(senderAccountId, new Hbar(-hbarAmount))
    .addHbarTransfer(receiverAccountId, new Hbar(hbarAmount))
    .freezeWith(client);
  const transferToAliasSign = await transferToAliasTx.sign(operatorKey);
  const transferToAliasSubmit = await transferToAliasSign.execute(client);
  const transferToAliasRx = await transferToAliasSubmit.getReceipt(client);

  // Get a transaction record and query the record to get information about the account creation
  const transferToAliasRec = await transferToAliasSubmit.getRecord(client);
  const txRecordQuery = await new TransactionRecordQuery()
    .setTransactionId(transferToAliasRec.transactionId)
    .setIncludeChildren(true)
    .execute(client);
  return [transferToAliasRx, txRecordQuery];
}

async function mirrorQueryFcn(publicKey: PublicKey) {
  // Query a mirror node for information about the account creation
  await delay(10000); // Wait for 10 seconds before querying account id
  const mirrorNodeUrl = 'http://127.0.0.1:5551/api/v1/';
  const mQuery = await axios.get(
    `${mirrorNodeUrl}accounts?account.publickey=${publicKey.toStringRaw()}`,
  );
  return mQuery;
}

async function main() {
  console.log('Generating a new key pair...');
  const newPrivateKey = PrivateKey.generateECDSA();
  const newPublicKey = newPrivateKey.publicKey;
  const newAliasAccountId = newPublicKey.toAccountId(0, 0);

  console.log(`- New account alias ID: ${newAliasAccountId} \n`);
  console.log(`- New private key (Hedera): ${newPrivateKey} \n`);
  console.log(`- New public key (Hedera): ${newPublicKey} \n`);
  console.log(
    `- New private key (RAW EVM): 0x${newPrivateKey.toStringRaw()} \n`,
  );
  console.log(`- New public key (RAW): 0x${newPublicKey.toStringRaw()} \n`);
  console.log(
    `- New public key (EVM): 0x${newPublicKey.toEthereumAddress()} \n\n`,
  );

  // Transfer HBAR to newAliasAccountId to auto-create the new account
  // Get account information from a transaction record query
  const [txReceipt, txRecQuery] = await autoCreateAccountFcn(
    operatorId,
    newAliasAccountId,
    100,
  );
  console.log(`- HBAR Transfer to new account: ${txReceipt.status} \n\n`);
  console.log(`- Parent transaction ID: ${txRecQuery.transactionId} \n`);
  console.log(
    `- Child transaction ID: ${txRecQuery.children[0].transactionId.toString()} \n`,
  );
  console.log(
    `- New account ID (from RECORD query): ${txRecQuery.children[0].receipt.accountId!.toString()} \n`,
  );

  // Get account information from a mirror node query
  const mirrorQueryResult = await mirrorQueryFcn(newPublicKey);
  console.log(
    `- New account ID (from MIRROR query): ${mirrorQueryResult.data?.accounts[0].account}\n`,
  );
}

main()
  .then(() => {})
  .catch((err: Error) => console.log(err));
