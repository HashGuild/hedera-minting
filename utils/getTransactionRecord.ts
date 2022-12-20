export default async function getTransactionRecord(transactionId: string) {
  try {
    const splitTransactionId = transactionId.split('@');
    splitTransactionId[1] = splitTransactionId[1].replace('.', '-');
    const parsedTransactionId = splitTransactionId.join('-');

    const BASE_URI =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://mainnet-public.mirrornode.hedera.com/api/v1/' : 'https://testnet.mirrornode.hedera.com/api/v1/';

    const res = await fetch(
      `${BASE_URI}transactions/${parsedTransactionId}`
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
