import { HashConnect, HashConnectTypes } from 'hashconnect';

const appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Minting powered by HashGuild',
  description:
    'A minting application enabling you to mint your project without writing a single line of code.',
  icon: 'https://s3.amazonaws.com/appforest_uf/f1666649189674x197365688252022720/HashGuildMintingLogo_200.png',
};
let hashconnectInstance: HashConnect | null = null;
let hcInitData: HashConnectTypes.InitilizationData | null = null;
let initializingHashconnect = false;

const HEDERA_NETWORK = process.env.HEDERA_NETWORK_TYPE === 'MAINNET' ? 'mainnet' : 'testnet'

async function initHashConnect(): Promise<
  [HashConnect, HashConnectTypes.InitilizationData]
> {
  if (initializingHashconnect) {
    throw new Error('Already initializing HashConnect.');
  }
  if (hashconnectInstance && hcInitData)
    return [hashconnectInstance, hcInitData];

  initializingHashconnect = true;
  const hashconnect = new HashConnect(true);
  const initData = await hashconnect.init(appMetadata, HEDERA_NETWORK, true);
  hashconnectInstance = hashconnect;
  hcInitData = initData;
  initializingHashconnect = false;
  return [hashconnect, initData];
}

export default initHashConnect;
