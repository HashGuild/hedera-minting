import React, { useContext, useState } from 'react';
import { HashConnectContext } from '../../context/HashConnectWrapper';
import { CollectionForm } from '../../utils/Interfaces';
import pinFilesAndMint from '../../utils/pinFilesAndMint';
import AttachWalletSection from '../common/AttachWalletSection';
import ErrorMessage from '../common/ErrorMessage';
import Modal from '../common/Modal';
import Button from '../global/Button';

type VerifyCollectionMintProps = {
  formData: CollectionForm;
};

const VerifyCollectionMint = function ({
  formData,
}: VerifyCollectionMintProps) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attachWallet, setAttachWallet] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState('');
  const [confirmMint, setConfirmMint] = useState(false);
  const [openConfirmMintModal, setOpenConfirmMintModal] = useState(false);
  const [hashconnect, initHashConnect] = useContext(HashConnectContext);

  const resetWaitingState = () => {
    setWaiting(false);
    setWaitingMessage('');
  };

  const resetTransactionState = () => {
    setSuccess(false);
    setError(false);
    resetWaitingState();
  };

  const createCollectionHandler = async () => {
    try {
      resetTransactionState();

      setWaitingMessage(
        'Pinning your NFT files to IPFS storage, this might take a second...'
      );
      setWaiting(true);
      const status = await pinFilesAndMint(
        formData,
        formData.nfts,
        initHashConnect!,
        hashconnect,
        (fileUploadSuccessful: boolean) => {
          if (!fileUploadSuccessful) {
            setWaiting(false);
            setWaitingMessage('');
            setError(true);
            return;
          }
          setWaitingMessage(
            'Waiting for you to sign the transaction. If it does not open automatically, please open the HashPack extension.'
          );
        }
      );
      if (status === 22) {
        setSuccess(true);
      } else {
        setError(true);
      }
      resetWaitingState();
    } catch (err) {
      resetWaitingState();
      console.log(err);
    }
  };
  return (
    <>
      {waiting || error ? (
        <div className="py-6 px-2 my-5 text-xs rounded-lg bg-black text-white">
          {waiting && <p>{waitingMessage}</p>}

          {error && (
            <p>
              Something went wrong while minting your collection. <br />
              Please try again. Troubleshooting -&gt;
            </p>
          )}
        </div>
      ) : null}
      <h1 className="text-3xl font-bold mt-8">
        {success ? 'Success!' : 'Verify and Mint'}
      </h1>
      <h4 className="text-lg font-bold mt-8 ">Your Collection Details</h4>
      <div className="my-3 grid grid-cols-3 gap-2">
        {formData.nfts.slice(0, 6).map((nft) => (
          <picture key={nft.tokenName}>
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
        Showing {formData.nfts.slice(0, 6).length} of {formData.nfts.length} NFT
        {formData.nfts.length > 1 && 's'}
      </p>

      <hr className="my-10" />

      {success ? (
        <p>
          You have just created your Collection {formData.displayName}.
          Congratulations.
        </p>
      ) : (
        <>
          <p>
            You are minting{' '}
            <strong>
              {formData?.nfts?.length} NFT{formData.nfts.length > 1 && 's'}.
            </strong>
          </p>
          <p className="mt-3">
            To proceed with your collection mint, please click on “Mint Now”
            below. This will open up your Hashpack Wallet to sign the
            transaction.
          </p>
          <p className="text-xs text-gray-500 mb-10 mt-5">
            No Hashpack Wallet? Get it{' '}
            <a
              href="https://www.hashpack.app/"
              className="underline hover:text-slate-600"
              target="_parent"
            >
              here -&gt;
            </a>
          </p>
        </>
      )}
      <div className=" mt-6">
        <Button
          onClick={() => {
            createCollectionHandler();
          }}
          title={success ? 'Mint More' : 'Mint Now'}
          className="w-full bg-black text-white   mb-4 rounded-md disabled:bg-black/40"
        />
        {success && (
          <Button
            onClick={() => {
              console.log('need hook');
            }}
            title="List your Collection on Hashguild."
            className="w-full bg-white border mb-20 border-black text-black rounded-md"
          />
        )}
      </div>
      <Modal showModal={attachWallet} setShowModal={setAttachWallet}>
        <AttachWalletSection />
      </Modal>
      <Modal
        setShowModal={setOpenConfirmMintModal}
        showModal={openConfirmMintModal}
      >
        <div className="flex flex-col p-3 z-20">
          <h2 className="font-bold text-lg">Are you ready?</h2>
          <p className="font-sm text-gray-400 mt-2">
            By moving ahead, you will not be able to modify your NFTs or the
            collection again. Please make sure that everything is setup
            properly.
          </p>
          <div className="flex px-2 my-6 gap-2 items-center">
            <input
              type="checkBox"
              onChange={(e) => setConfirmMint(e.currentTarget.checked)}
              name="confirmMinting"
              className=" h-6 w-6 bordera accent-black checked:rounded-md"
            />
            <p className="text-xs">
              I’ve read and understood that there is no going back
            </p>
          </div>
          {formData.nfts.length === 0 && (
            <ErrorMessage errorText="There should be at least one NFT." />
          )}
        </div>

        <Button
          onClick={() => {
            console.log('need hook');
          }}
          disabled={!confirmMint}
          title="Confirm"
          className="w-full bg-black  text-white rounded-md  disabled:bg-black/40"
        />

        <Button
          onClick={() => {
            setOpenConfirmMintModal(false);
          }}
          title="Cancel"
          className="w-full bg-white mt-4 border  text-black rounded-md"
        />
      </Modal>
    </>
  );
};

export default VerifyCollectionMint;
