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
    tokenSymbol: '',
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
    tokenSymbolError: true,
    nftFilesError: false,
    nftThumbnailError: true,
    splitPercentError: false,
    feeError: true,
    accountIdError: true,
    nftPropertiesError: true,
    sellingOptionError: false,
    listingPriceError: false,
  });
  const validateNftForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
  };
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

      setFormData({
        ...formData,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
    validateNftForm(event);
  };
  const checkFormValidated = () => {
    const validated = Object.values(formDataErrors).every(
      (item) => item === false
    );
    return validated;
  };

  return (
    <div>
      {renderConfirmMint ? (
        <VerifyAndMintSection
          setRenderConfirmMint={setRenderConfirmMint}
          formData={formData}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold">Create a single NFT</h1>
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
          <SellingOptionsSection
            formDataErrors={formDataErrors}
            setFormDataErrors={setFormDataErrors}
            setFormData={setFormData}
            formData={formData}
            handleFormChange={handleFormChange}
          />

          <hr />

          <Button
            onClick={() => {
              setRenderConfirmMint(true);
            }}
            disabled={!checkFormValidated()}
            title="Continue"
            className="w-full bg-black mt-5 text-white hover:bg-black/80 dark:hover:bg-white/80 dark:bg-white dark:text-black rounded-md disabled:bg-black/20  dark:disabled:bg-white/20"
          />
        </>
      )}
    </div>
  );
};

export default CreateNft;
