import {
  AccountId,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  TransactionResponse,
} from '@hashgraph/sdk';
import axios from 'axios';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { HashConnectContext } from '../../context/HashConnectWrapper';
import { NftForm, nftFormType, NftInCollection } from '../../utils/Interfaces';
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
  const [error] = useState(false);
  const [success] = useState(false);
  const [waiting] = useState(false);
  const [attachWallet, setAttachWallet] = useState(false);
  const [hashconnect, initHashConnect] = useContext(HashConnectContext);

  const isNftForm = nftFormType(formData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createNftHandler = async () => {
    try {
      let hc = hashconnect;
      if (!hc) {
        hc = await initHashConnect!();
      }

      const data = new FormData();
      data.set('name', formData.tokenName);
      data.set('creator', formData.creatorName);
      data.set('description', formData.description);
      data.set('thumbnailFile', formData.nftThumbnail!);
      if (formData.nftPropertiesEnabled) {
        data.set('attributes', JSON.stringify(formData.nftProperties));
      }
      for (const file of formData.nftFiles) {
        data.append('files', file);
      }
      const res = await axios.post('/api/uploadMetadataToIPFS', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const mintNftRequest = new ContractExecuteTransaction()
        .setContractId(process.env.NEXT_PUBLIC_MINTING_CONTRACT_ID!)
        .setGas(2500000)
        .setPayableAmount(500)
        .setFunction(
          'createTokenAndMintMultipleNfts',
          new ContractFunctionParameters()
            .addString(formData.tokenName)
            .addString('TEST')
            // @ts-ignore
            .addInt64(1)
            .addUint32(7000000)
            .addBytesArray([Buffer.from(res.data.url)])
        );

      hc!.connectToLocalWallet();

      hc!.pairingEvent.once(async (pairingData) => {
        try {
          const provider = hc!.getProvider(
            'testnet',
            pairingData.topic,
            pairingData.accountIds[0]
          );
          const signer = hc!.getSigner(provider);

          // const tokenSolidityAddr =
          //   mintMultipleNftsRx.contractFunctionResult!.getAddress(0);
          // const tokenId = AccountId.fromSolidityAddress(tokenSolidityAddr);
          const trans = await mintNftRequest.freezeWithSigner(signer);
          const transExec = await trans.executeWithSigner(signer);
          // const transRx = await transExec.getRecordWithSigner(signer);
          // const transRc = await transExec.getReceiptWithSigner(signer);
          console.log('MY TRANS RESPONSE:',transExec)

          // console.log('Status:', transRc.status);
          // const tokenSolidityAddr =
          //   transRx.contractFunctionResult!.getAddress(0);
          // const tokenId = AccountId.fromSolidityAddress(tokenSolidityAddr);
          // console.log('NEW TOKEN ID: ', tokenId);
        } catch (err) {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {waiting || error ? (
        <div className="py-6 px-2 my-5 text-xs  rounded-lg bg-black text-white">
          {waiting && (
            <p>
              Waiting for you to sign the transaction.
              <br />
              Try Again -&gt;
            </p>
          )}

          {error && (
            <p>
              Something went wrong while minting your collection. <br />
              Please try again. Troubleshooting -&gt;
            </p>
          )}
        </div>
      ) : null}
      <h1 className="font-bold text-3xl">
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
