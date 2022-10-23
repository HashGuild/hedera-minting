import { SVGProps } from 'react';

export interface Step {
  index: number;
  name?: string;
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
export interface UserWalletRoyalty {
  fee: number;
  accountId: string;
}
export type NftForm = {
  tokenName: string;
  creatorName: string;
  displayName: string;
  description: string;
  nftThumbnail: File | null;
  nftFiles: File[];
  splitRoyaltiesEnabled: boolean;
  splitPercent: number;
  royaltyWallets: UserWalletRoyalty[];
  nftPropertiesEnabled: boolean;
  nftProperties: NftProperty[];
  sellingOption: string;
  listingPrice: number;
};
export type NftFormErrors = {
  tokenNameError: boolean;
  creatorNameError: boolean;
  displayNameError: boolean;
  descriptionError: boolean;
  accountIdError: boolean;
  feeError: boolean;
  nftThumbnailError: boolean;
  nftFilesError: boolean;
  splitPercentError: boolean;
  nftPropertiesError: boolean;
  sellingOptionError: boolean;
  listingPriceError: boolean;
};
export type StepOneErrors = Omit<
  NftFormErrors,
  | 'nftThumbnailError'
  | 'nftFilesError'
  | 'nftPropertiesEnabledError'
  | 'nftPropertiesError'
  | 'sellingOptionError'
  | 'listingPriceError'
>;
export type StepTwoErrors = Omit<
  NftFormErrors,
  'splitPercentError' | 'displayNameError' | 'feeError' | 'accountIdError'
> & {
  descriptionError: boolean;
};
export type NftInCollection = {
  tokenName: string;
  creatorName: string;
  description: string;
  nftThumbnail: File | null;
  nftFiles: File[];
  nftPropertiesEnabled: boolean;
  nftProperties: NftProperty[];
  sellingOption: string;
  listingPrice: number;
};
export type CollectionForm = Omit<
  NftForm,
  | 'nftThumbnail'
  | 'nftFiles'
  | 'nftPropertiesEnabled'
  | 'nftProperties'
  | 'sellingOption'
  | 'listingPrice'
> & {
  nfts: NftInCollection[];
};

export const nftFormType = (props: unknown): props is NftForm =>
  Object.prototype.hasOwnProperty.call(props, 'displayName');

export const nftErrorType = (props: unknown): props is NftFormErrors =>
  Object.prototype.hasOwnProperty.call(props, 'displayNameError');
export type HelpButtons = {
  name: string;
  href: string;
};
