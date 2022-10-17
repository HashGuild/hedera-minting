import axios from 'axios';
import type { NextPage } from 'next';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import VerifyAndMintSection from '../components/common/VerifyAndMintSection';
import BasicNFTSection from '../components/createNft/BasicNFTSection';
import FileUploadSection from '../components/createNft/FileUploadSection';
import PropertiesSection from '../components/createNft/PropertiesSection';
import RoyaltiesSection from '../components/createNft/RoyaltiesSection';
import SellingOptionsSection from '../components/createNft/SellingOptionsSection';
import Button from '../components/global/Button';
import {
  NftForm,
  NftFormErrors,
  NftInCollection,
  StepTwoErrors,
} from '../utils/Interfaces';

const CreateNft: NextPage = function () {
  const [renderConfirmMint, setRenderConfirmMint] = useState(false);

  const [formData, setFormData] = useState<NftForm | NftInCollection>({
    tokenName: '',
    creatorName: '',
    displayName: '',
    nftFiles: [],
    description: '',
    splitRoyaltiesEnabled: false,
    royaltyWallets: [{ fee: 0, accountId: '' }],
    nftThumbnail: null,
    nftPropertiesEnabled: false,
    splitPercent: 0,
    nftProperties: [{ key: '', value: '' }],
    sellingOption: 'Mint Only',
    listingPrice: 0,
  });
  const [formDataErrors, setFormDataErrors] = useState<
    NftFormErrors | StepTwoErrors
  >({
    tokenNameError: true,
    creatorNameError: true,
    displayNameError: true,
    descriptionError: true,
    nftFilesError: false,
    nftThumbnailError: true,
    splitPercentError: true,
    nftPropertiesError: true,
    sellingOptionError: false,
    listingPriceError: false,
  });

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.currentTarget.type === 'checkbox') {
      setFormData({
        ...formData,
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
      setFormData({
        ...formData,
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

  const uploadNftData = async () => {
    try {
      const data = new FormData();
      data.set('name', formData.tokenName);
      data.set('creator', formData.creatorName);
      data.set('description', formData.description);
      data.set('thumbnailFile', formData.nftThumbnail!);
      for (const file of formData.nftFiles) {
        data.append('files', file);
      }
      console.log(data)
      const res = await axios.post('/api/uploadMetadataToIPFS', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button type="button" onClick={uploadNftData}>
        Upload ffs
      </button>
      {renderConfirmMint ? (
        <VerifyAndMintSection
          setRenderConfirmMint={setRenderConfirmMint}
          formData={formData}
        />
      ) : (
        <>
          <h1 className="text-3xl mt-16 font-bold">Create a single NFT</h1>
          <FileUploadSection
            formDataErrors={formDataErrors}
            setFormDataErrors={setFormDataErrors}
            formData={formData}
            setFormData={setFormData}
          />

          <BasicNFTSection
            formDataErrors={formDataErrors}
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <hr />
          <RoyaltiesSection
            formDataErrors={formDataErrors as NftFormErrors}
            setFormDataErrors={
              setFormDataErrors as Dispatch<SetStateAction<NftFormErrors>>
            }
            setFormData={setFormData as Dispatch<SetStateAction<NftForm>>}
            formData={formData as NftForm}
            handleFormChange={handleFormChange}
          />
          <hr />
          <PropertiesSection
            formDataErrors={formDataErrors}
            setFormDataErrors={setFormDataErrors}
            setFormData={setFormData}
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <hr />
          <SellingOptionsSection />

          <hr />

          <Button
            onClick={() => {
              setRenderConfirmMint(true);
            }}
            disabled={!checkFormValidated()}
            title="Continue"
            className="w-full bg-black mt-5 text-white rounded-md disabled:bg-black/40"
          />
        </>
      )}
    </div>
  );
};

export default CreateNft;
