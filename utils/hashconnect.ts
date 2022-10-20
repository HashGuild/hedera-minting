import { HashConnect, HashConnectTypes } from 'hashconnect';

const appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Minting | powered by HashGuild',
  description:
    'A minting application enabling you to mint your project without writing a single line of code.',
  icon: '',
};

let hashconnectInstance: HashConnect | null = null;
let initializingHashconnect = false;

async function initHashConnect() {
  if (initializingHashconnect) {
    throw new Error('Already initializing HashConnect.');
  }
  if (hashconnectInstance) return hashconnectInstance;

  initializingHashconnect = true;
  const hashconnect = new HashConnect(true);
  await hashconnect.init(appMetadata, 'testnet', true);
  hashconnectInstance = hashconnect;
  initializingHashconnect = false;
  return hashconnect;
}

export default initHashConnect;
