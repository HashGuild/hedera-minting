import CollectionSvg from '../public/svg/CollectionSvg';
import MintAndSell from '../public/svg/MintAndSell';
import MintOnly from '../public/svg/MintOnly';
import NFTSvg from '../public/svg/NFTSvg';
import { Flow, SellingOption, Step } from './Interfaces';

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
export const sellingOptions: SellingOption[] = [
  {
    index: 1,
    name: 'Mint Only',
    icon: MintOnly,
  },
  {
    index: 2,
    name: 'Mint and Sell',
    icon: MintAndSell,
  },
];
