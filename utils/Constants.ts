import CollectionSvg from '../public/svg/CollectionSvg';
import MintAndSell from '../public/svg/MintAndSell';
import MintOnly from '../public/svg/MintOnly';
import NFTSvg from '../public/svg/NFTSvg';
import { Flow, HelpButtons, SellingOption, Step } from './Interfaces';

export const collectionSteps: Step[] = [
  { name: 'Create collection', index: 1 },
  { name: 'Upload files', index: 2 },
  { name: 'Create NFTs', index: 3 },
  { name: 'Mint & Pay', index: 4 },
];

export const indexFlow: Flow[] = [
  {
    index: 1,
    name: 'Single NFT',
    href: '/create-nft',
    icon: NFTSvg,
  },
  {
    index: 2,
    name: 'NFT Collection',
    href: '/create-collection',
    icon: CollectionSvg,
  },
];
export const sellingOptions: SellingOption[] = [
  {
    index: 1,
    name: 'Mint Only',
    icon: MintOnly,
  },
  {
    index: 2,
    name: 'Mint & List',
    icon: MintAndSell,
  },
];

export const helpButtons: HelpButtons[] = [
  {
    name: 'Read the How-to-Use Guide',
    href: 'https://hashguild.xyz/mint-nfts',
  },
  {
    name: 'Enter Discord to Chat with a Person',
    href: 'https://discord.gg/TEyQkbMwaw',
  },
  {
    name: 'Go to the HashGuild Twitter',
    href: 'https://twitter.com/hashguild',
  },
  {
    name: 'Have a look at the Project on Github',
    href: 'https://github.com/HashGuild/hedera-minting',
  },
];
