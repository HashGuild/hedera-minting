import CollectionSvg from '../public/svg/CollectionSvg';
import NFTSvg from '../public/svg/NFTSvg';
import { Flow, Step } from './Interfaces';

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
    name: 'Collection',
    href: '/create-collection',
    icon: CollectionSvg,
  },
];
