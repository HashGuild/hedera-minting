export default async function getTransactionRecord(transactionId: string) {
  try {
    const splitTransactionId = transactionId.split('@');
    splitTransactionId[1] = splitTransactionId[1].replace('.', '-');
    const parsedTransactionId = splitTransactionId.join('-');

    const res = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/transactions/${parsedTransactionId}`
    );
    if (!res.ok) {
      throw new Error(
        'Something went wrong while fetching the transaction record.'
      );
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
