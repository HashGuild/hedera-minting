import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { NftForm } from '../../utils/Interfaces';
import Button from '../global/Button';

interface VerifyAndMintSectionProps {
  formData: NftForm;
  setRenderConfirmMint: Dispatch<SetStateAction<boolean>>;
}

const VerifyAndMintSection = function ({
  formData,
  setRenderConfirmMint,
}: VerifyAndMintSectionProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1 className="font-bold text-3xl">Verify and Mint</h1>
      <h3 className="my-8">Your NFT</h3>
      <picture>
        <source src={URL.createObjectURL(formData.nftFiles[0])} />
        <img
          src={URL.createObjectURL(formData.nftFiles[0])}
          alt="overlay"
          className="rounded-md w-full h-1/2 mb-8"
        />
      </picture>
      <section className="mb-16">
        <p className="text-xs text-gray-500">Creator: {formData.creatorName}</p>
        <p className="text-xl font-semibold">{formData.tokenName}</p>
        <p>{formData.displayName}</p>
      </section>
      <p className="text-sm ">
        You are minting {formData.nftFiles.length}
        {formData.nftFiles.length > 1 ? ' NFTs' : ' NFT'}
        <br />
        <br />
        To proceed with your mint, please click on “Mint Now” below. This will
        open up your Hashpack Wallet to sign the transaction.
      </p>
      <p className="text-xs text-gray-500 mb-10 mt-5">
        No Hashpack Wallet? Get it here -&gt;
      </p>
      <Button
        title="Mint Now"
        onClick={() => console.log('hook')}
        className="w-full rounded-md mb-6 bg-black text-white hover:bg-black/80"
      />
      <Button
        title="Go Back and Change Data"
        onClick={() => setRenderConfirmMint(false)}
        className="w-full rounded-md bg-white text-gray-400 border border-black"
      />
    </div>
  );
};

export default VerifyAndMintSection;
