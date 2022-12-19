export default async function getAccountInfo(
  accountId: string
) {
    try {
    const BASE_URI =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://mainnet-public.mirrornode.hedera.com/api/v1/' : 'https://testnet.mirrornode.hedera.com/api/v1/';

    const res = await fetch(
      `${BASE_URI}accounts/${accountId}`
    );
    if (!res.ok) {
        return false;
      throw new Error(
        'Something went wrong while retrieving the account record.'
      );
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
