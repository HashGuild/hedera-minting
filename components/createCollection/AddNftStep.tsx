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
  tokenName: '',
  creatorName: '',
  description: '',
  nftFiles: [],
  nftThumbnail: null,
  nftPropertiesEnabled: false,
  nftProperties: [{ key: '', value: '' }],
  sellingOption: 'Mint Only',
  listingPrice: 0,
};

const initialErrors = {
  tokenNameError: true,
  creatorNameError: true,
  descriptionError: true,
  nftFilesError: false,
  nftThumbnailError: true,
  nftPropertiesError: false,
  sellingOptionError: false,
  listingPriceError: false,
};
const AddNftStep = function ({
  setStep,
  setFormData,
  formData,
}: AddNftStepProps) {
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
          {formData?.nfts?.map((nft) => (
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
            setStep((prev) => prev + 1);
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
        className="w-full bg-black mt-5 text-white rounded-md disabled:bg-black/40"
      />
    </>
  );
};

export default AddNftStep;