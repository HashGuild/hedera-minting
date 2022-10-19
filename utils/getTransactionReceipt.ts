import { TransactionReceiptQuery } from '@hashgraph/sdk';
import NodeClient from '@hashgraph/sdk/lib/client/NodeClient';

export default async function getTransactionReceipt(
  transactionId: string,
  client: NodeClient
) {
  try {
    const receiptTrans = new TransactionReceiptQuery().setTransactionId(
      transactionId
    );
    const receipt = await receiptTrans.execute(client);
    return receipt;
  } catch (error) {
    console.log(error);
    return null;
  }
}
