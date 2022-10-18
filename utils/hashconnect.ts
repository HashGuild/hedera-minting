import { HashConnect, HashConnectTypes } from 'hashconnect';

const appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Minting | powered by HashGuild',
  description:
    'A minting application enabling you to mint your project without writing a single line of code.',
  icon: '',
};

async function initHashConnect() {
  const hashconnect = new HashConnect(true);
  await hashconnect.init(appMetadata, 'testnet', true);
  return hashconnect;
}

export default initHashConnect;
