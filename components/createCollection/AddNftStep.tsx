import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  CollectionForm,
  NftForm,
  NftFormErrors,
  NftInCollection,
  StepTwoErrors,
} from '../../utils/Interfaces';
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
  serial: 0,
  creatorName: '',
  description: '',
  nftFiles: [],
  nftThumbnail: null,
  displayName: '',
  nftPropertiesEnabled: false,
  nftProperties: [{ key: '', value: '' }],
  sellingOption: 'Mint Only',
  listingPrice: 0,
};

const initialErrors = {
  creatorNameError: true,
  descriptionError: true,
  nftFilesError: false,
  nftThumbnailError: true,
  nftPropertiesError: false,
  sellingOptionError: false,
  displayNameError: true,
  listingPriceError: false,
};

const errorsOnEdit = {
  creatorNameError: false,
  descriptionError: false,
  nftFilesError: false,
  nftThumbnailError: false,
  nftPropertiesError: false,
  sellingOptionError: false,
  displayNameError: false,
  listingPriceError: false,
};
const AddNftStep = function ({
  setStep,
  setFormData,
  formData,
}: AddNftStepProps) {
  const [addNft, setAddNft] = useState(false);
  const [editNft, setEditNft] = useState(false);

  const [nftFormData, setNftFormData] = useState<NftInCollection | NftForm>({
    serial: formData.nfts.length === 0 ? 0 : formData.nfts.length,
    creatorName: '',
    description: '',
    nftFiles: [],
    nftThumbnail: null,
    displayName: '',
    nftPropertiesEnabled: false,
    nftProperties: [{ key: '', value: '' }],
    sellingOption: 'Mint Only',
    listingPrice: 0,
  });
  const [formDataErrors, setFormDataErrors] = useState<
    StepTwoErrors | NftFormErrors
  >(formData.nfts.length === 0 ? initialErrors : errorsOnEdit);
  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.currentTarget.type === 'checkbox') {
      setNftFormData({
        ...nftFormData,
        [event.currentTarget.name]: (event.currentTarget as HTMLInputElement)
          .checked,
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
      (item) => item === false
    );
    return validated;
  };
  const deleteNft = (index: number) => {
    const updatedArray = formData.nfts.filter((item) => item.serial !== index);
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
      (item) => item.serial !== nft.serial
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
    setNftFormData({
      ...initialState,
      serial: formData.nfts.length === 0 ? 0 : formData.nfts.length,
    });
    setFormDataErrors(initialErrors);
    setAddNft(true);
  };

  if (!addNft) {
    return (
      <>
        <h1 className="text-3xl font-bold mt-11">Create your NFTs</h1>

        <h4 className="text mt-2">Create your NFTs which shall be minted under this collection. <br /> When you&apos;re ready, hit &apos;Mint Collection&apos;.</h4>

        <div className="py-7 border-b grid grid-cols-2 md:grid-cols-3 gap-2">
          <div role="presentation" onClick={addNftInCollection}>
            <NFTCard emptyCard />
          </div>
          {formData?.nfts?.map((nft, index) => (
            <NFTCard
              deleteNft={() => deleteNft(index)}
              editNft={() => editNftItem(nft)}
              image={URL.createObjectURL(nft.nftThumbnail!)}
              nftName={nft.displayName}
              collectionName={nft.creatorName}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            setStep((prev) => prev + 1);
          }}
          title="Mint Collection"
          className="w-full bg-black mt-6 text-white rounded-md disabled:bg-black/40"
          disabled={formData?.nfts.length < 1}
        />
        <Button
          onClick={() => {
            setStep((prev) => prev - 1);
          }}
          title="Go Back and Change Data"
          className="w-full bg-white mt-2 text-black rounded-md border disabled:bg-black/40 hover:bg-black/30 dark:hover:bg-white/30"
        />
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
      // formDataErrors={formDataErrors}
      // setFormDataErrors={setFormDataErrors}
      // formData={nftFormData}
      // setFormData={setNftFormData}
      // handleFormChange={handleFormChange}
      />

      <hr />

      <Button
        onClick={editNft ? editNftConfirm : addNftConfirm}
        disabled={!checkFormValidated()}
        title="Continue"
        className="w-full bg-black text-white dark:bg-white dark:text-black mt-5 rounded-md  disabled:bg-black/50 dark:disabled:bg-white/50 hover:bg-black/80 dark:hover:bg-white/80 "
      />
    </>
  );
};

export default AddNftStep;
