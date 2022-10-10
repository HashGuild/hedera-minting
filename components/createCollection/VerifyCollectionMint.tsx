import React from 'react';
import { CollectionForm } from '../../utils/Interfaces';
import Button from '../global/Button';

type VerifyCollectionMintProps = {
  formData: CollectionForm;
};

const VerifyCollectionMint = function ({
  formData,
}: VerifyCollectionMintProps) {
  return (
    <>
      <h1 className="text-3xl mt-16 font-bold">Verify and Mint</h1>
      <h4 className="text-lg font-bold mt-8 ">Your Collection Details</h4>
      <div className="my-3 grid grid-cols-3 gap-2">
        {formData.nfts.slice(0, 6).map((nft) => (
          <picture>
            <source src={URL.createObjectURL(nft.nftThumbnail as Blob)} />
            <img
              className="max-h-[9rem] min-h-[9rem] md:max-h-[11rem] md:min-h-[11rem] border rounded-md overflow-hidden w-full object-cover"
              src={URL.createObjectURL(nft.nftThumbnail as Blob)}
              alt="nft"
            />
          </picture>
        ))}
      </div>
      <p className="text-xs  ">
        Showing {formData.nfts.slice(0, 6).length} of 12 NFTs
      </p>

      <hr className="my-10" />
      <p>
        You are minting <strong>{formData?.nfts?.length} Nfts.</strong>
      </p>
      <p className="mt-3">
        To proceed with your collection mint, please click on “Mint Now” below.
        This will open up your Hashpack Wallet to sign the transaction.
      </p>
      <p className="text-xs text-gray-500 mb-10 mt-5">
        No Hashpack Wallet? Get it
        <a
          href="https://www.hashpack.app/"
          className="underline hover:text-slate-600"
          target="_parent"
        >
          {' '}
          here -&gt;
        </a>
      </p>

      <Button
        onClick={() => {
          console.log('need hook');
        }}
        title="Mint Now"
        className="w-full bg-black mt-6 mb-20 text-white rounded-md disabled:bg-black/40"
      />
    </>
  );
};

export default VerifyCollectionMint;
