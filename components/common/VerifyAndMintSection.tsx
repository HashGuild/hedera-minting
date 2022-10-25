import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { HashConnectContext } from '../../context/HashConnectWrapper';
import { NftForm, nftFormType, NftInCollection } from '../../utils/Interfaces';
import pinFilesAndMint from '../../utils/pinFilesAndMint';
import Button from '../global/Button';
import AttachWalletSection from './AttachWalletSection';
import Modal from './Modal';

interface VerifyAndMintSectionProps {
  formData: NftForm | NftInCollection;
  setRenderConfirmMint: Dispatch<SetStateAction<boolean>>;
}

const VerifyAndMintSection = function ({
  formData,
  setRenderConfirmMint,
}: VerifyAndMintSectionProps) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState('');
  const [attachWallet, setAttachWallet] = useState(false);
  const [hashconnect, initHashConnect] = useContext(HashConnectContext);

  const isNftForm = nftFormType(formData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetWaitingState = () => {
    setWaiting(false);
    setWaitingMessage('');
  };

  const resetTransactionState = () => {
    setSuccess(false);
    setError(false);
    resetWaitingState();
  };

  const createNftHandler = async () => {
    try {
      resetTransactionState();
      setWaitingMessage(
        'Pinning your NFT files to IPFS storage, this might take a second...'
      );
      setWaiting(true);
      const status = await pinFilesAndMint(
        formData,
        [formData],
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
    <div>
      {waiting || error ? (
        <div className="py-6 px-2 my-5 text-xs  rounded-lg bg-black text-white">
          {waiting && <p>{waitingMessage}</p>}

          {error && (
            <p>
              Something went wrong while minting your collection. <br />
              Please try again. Troubleshooting -&gt;
            </p>
          )}
        </div>
      ) : null}
      <h1 className="font-bold text-3xl mt-8">
        {' '}
        {success ? 'Success!' : 'Verify and Mint'}
      </h1>
      <h3 className="my-8">Your NFT</h3>
      <picture>
        <source src={URL.createObjectURL(formData.nftThumbnail!)} />
        <img
          src={URL.createObjectURL(formData.nftThumbnail!)}
          alt="overlay"
          className="rounded-md w-full h-1/2 mb-8"
        />
      </picture>
      {success ? (
        <p className="my-10">
          You have just created your NFT {formData.tokenName}. Congratulations!
        </p>
      ) : (
        <section className="mb-16">
          <p className="text-xs text-gray-500">
            Creator: {formData.creatorName}
          </p>
          <p className="text-xl font-semibold">{formData.tokenName}</p>
          <p className=" my-3">{isNftForm ? formData.description : ''}</p>
          <p className="text-sm ">
            You are minting 1 NFT
            <br />
            <br />
            To proceed with your mint, please click on “Mint Now” below. This
            will open up your Hashpack Wallet to sign the transaction.
          </p>
          <p className="text-xs text-gray-500 mb-10 mt-5">
            No Hashpack Wallet? Get it
            <a
              href="https://www.hashpack.app/"
              className="underline hover:text-slate-600"
            >
              {' '}
              here -&gt;
            </a>
          </p>
        </section>
      )}

      <Button
        title={success ? 'Mint More' : 'Mint Now'}
        onClick={() => createNftHandler()}
        className="w-full rounded-md mb-3 bg-black text-white hover:bg-black/80"
      />
      <Modal showModal={attachWallet} setShowModal={setAttachWallet}>
        <AttachWalletSection />
      </Modal>
      <Button
        title={
          success ? 'List your NFT on HashGuild' : 'Go Back and Change Data'
        }
        onClick={() => setRenderConfirmMint(false)}
        className="w-full rounded-md bg-white text-black border border-black"
      />
    </div>
  );
};

export default VerifyAndMintSection;
