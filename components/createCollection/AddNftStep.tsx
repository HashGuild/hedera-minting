import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  CollectionForm,
  NftForm,
  NftFormErrors,
  NftInCollection,
  StepTwoErrors,
} from '../../utils/Interfaces';
import Modal from '../common/Modal';
import BasicNFTSection from '../createNft/BasicNFTSection';
import FileUploadSection from '../createNft/FileUploadSection';
import PropertiesSection from '../createNft/PropertiesSection';
import SellingOptionsSection from '../createNft/SellingOptionsSection';
import Button from '../global/Button';
import NFTCard from './NFTCard';

type AddNftStepProps = {
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<CollectionForm>>;
  formData: CollectionForm;
};
const initialState = {
  tokenName: '',
  creatorName: '',
  description: '',
  nftFiles: [],
  nftThumbnail: null,
  nftPropertiesEnabled: false,
  nftProperties: [{ key: '', value: '' }],
  sellingOption: '',
  listingPrice: 0,
};

const initialErrors = {
  tokenNameError: true,
  creatorNameError: true,
  descriptionError: true,
  nftFilesError: false,
  nftThumbnailError: false,
  nftPropertiesError: false,
  sellingOptionError: true,
  listingPriceError: false,
};
const AddNftStep = function ({
  setStep,
  setFormData,
  formData,
}: AddNftStepProps) {
  const [confirmMint, setConfirmMint] = useState(false);
  const [openConfirmMintModal, setOpenConfirmMintModal] = useState(false);
  const [addNft, setAddNft] = useState(false);
  const [editNft, setEditNft] = useState(false);

  const [nftFormData, setNftFormData] = useState<NftInCollection | NftForm>(
    initialState,
  );
  const [formDataErrors, setFormDataErrors] = useState<
    StepTwoErrors | NftFormErrors
  >(initialErrors);
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'checkbox') {
      setNftFormData({
        ...nftFormData,
        [event.currentTarget.name]: event.currentTarget.checked,
      });
    } else {
      // form Validation for events.
      if (event.target.value.length === 0) {
        setFormDataErrors({
          ...formDataErrors,
          [`${event.target.name}Error`]: true,
        });
      } else {
        setFormDataErrors({
          ...formDataErrors,
          [`${event.target.name}Error`]: false,
        });
      }
      setNftFormData({
        ...nftFormData,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  };
  const checkFormValidated = () => {
    const validated = Object.values(formDataErrors).every(
      (item) => item === false,
    );
    return validated;
  };
  const deleteNft = (tokenName: string) => {
    const updatedArray = formData.nfts.filter(
      (item) => item.tokenName !== tokenName,
    );
    setFormData({
      ...formData,
      nfts: updatedArray,
    });
  };
  const editNftItem = (nft: NftInCollection) => {
    setEditNft(true);
    setNftFormData(nft);
    setAddNft(true);
    const updatedArray = formData.nfts.filter(
      (item) => item.tokenName !== nft.tokenName,
    );
    setFormData({
      ...formData,
      nfts: updatedArray,
    });
  };

  const addNftConfirm = () => {
    setAddNft(false);
    setFormData((prev) => ({
      ...prev,
      nfts: [...prev.nfts, nftFormData as NftInCollection],
    }));
  };
  const editNftConfirm = () => {
    setAddNft(false);
    setEditNft(false);
    setFormData((prev) => ({
      ...prev,
      nfts: [...prev.nfts, nftFormData as NftInCollection],
    }));
  };

  const addNftInCollection = () => {
    setNftFormData(initialState);
    setFormDataErrors(initialErrors);
    setAddNft(true);
  };
  if (!addNft) {
    return (
      <>
        <h1 className="text-3xl mt-16 font-bold">Create your NFTs</h1>
        <h4 className="text-sm mt-2">Basic Collection Information</h4>

        <div className="py-7 border-b grid grid-cols-2 md:grid-cols-3 gap-2">
          <div role="presentation" onClick={addNftInCollection}>
            <NFTCard emptyCard />
          </div>
          {formData.nfts.map((nft) => (
            <NFTCard
              deleteNft={() => deleteNft(nft.tokenName)}
              editNft={() => editNftItem(nft)}
              image={URL.createObjectURL(nft.nftThumbnail!)}
              nftName={nft.tokenName}
              collectionName={nft.creatorName}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            setOpenConfirmMintModal(true);
          }}
          title="Mint Collection"
          className="w-full bg-black mt-6 text-white rounded-md disabled:bg-black/40"
        />
        <Button
          onClick={() => {
            setStep((prev) => prev - 1);
          }}
          title="Go Back and Change Data"
          className="w-full bg-white mt-2 text-black rounded-md border disabled:bg-black/40"
        />
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
          </div>
          <Button
            onClick={() => {
              setStep((prev) => prev + 1);
            }}
            disabled={!confirmMint && formData.nfts.length > 0}
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
  }
  return (
    <>
      <h1 className="text-3xl mt-16 font-bold">Add NFT to Collection</h1>
      <FileUploadSection
        formDataErrors={formDataErrors}
        setFormDataErrors={setFormDataErrors}
        setFormData={setNftFormData}
        formData={nftFormData}
      />

      <BasicNFTSection
        formDataErrors={formDataErrors}
        formData={nftFormData}
        handleFormChange={handleFormChange}
      />

      <hr />
      <PropertiesSection
        formDataErrors={formDataErrors}
        setFormDataErrors={setFormDataErrors}
        setFormData={setNftFormData}
        formData={nftFormData}
        handleFormChange={handleFormChange}
      />
      <hr />
      <SellingOptionsSection
        formDataErrors={formDataErrors}
        setFormDataErrors={setFormDataErrors}
        formData={nftFormData}
        setFormData={setNftFormData}
        handleFormChange={handleFormChange}
      />

      <hr />

      <Button
        onClick={editNft ? editNftConfirm : addNftConfirm}
        disabled={!checkFormValidated()}
        title="Continue"
        className="w-full bg-black mt-5 text-white rounded-md disabled:bg-black/40"
      />
    </>
  );
};

export default AddNftStep;
