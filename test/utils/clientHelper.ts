import { PrivateKey } from '@hashgraph/cryptography';
import { AccountId, Client } from '@hashgraph/sdk';

export function initClient() {
  const node = { '127.0.0.1:50211': new AccountId(3) };
  return Client.forNetwork(node).setMirrorNetwork('127.0.0.1:5600');
}

export function setClientOperator(
  operatorIdString: string,
  operatorKeyString: string,
  client: Client,
) {
  client.setOperator(operatorIdString, operatorKeyString);

  const operatorId = AccountId.fromString(operatorIdString);
  const operatorKey = PrivateKey.fromString(operatorKeyString);
  return [operatorId, operatorKey];
}
