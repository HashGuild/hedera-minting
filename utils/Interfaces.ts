import { SVGProps } from 'react';

export interface Step {
  index: number;
  name: string;
}

export interface Flow extends Step {
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
export type SellingOption = Omit<Flow, 'href'>;

export interface NftProperty {
  key: string;
  value: string;
}
export type NftForm = {
  tokenName: string;
  creatorName: string;
  displayName: string;
  nftFiles: File[];
  spinRoyaltiesEnabled: boolean;
  spinPercent: number;
  royaltyWallets: string[];
  nftPropertiesEnabled: boolean;
  nftProperties: NftProperty[];
  sellingOption: string;
  listingPrice: string;
};
