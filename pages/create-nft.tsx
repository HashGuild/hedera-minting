import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import VerifyAndMintSection from '../components/common/VerifyAndMintSection';
import BasicNFTSection from '../components/createNft/BasicNFTSection';
import FileUploadSection from '../components/createNft/FileUploadSection';
import PropertiesSection from '../components/createNft/PropertiesSection';
import RoyaltiesSection from '../components/createNft/RoyaltiesSection';
import SellingOptionsSection from '../components/createNft/SellingOptionsSection';
import Button from '../components/global/Button';
import { NftForm, NftFormErrors } from '../utils/Interfaces';

const CreateNft: NextPage = function () {
  const [renderConfirmMint, setRenderConfirmMint] = useState(false);

  const [formData, setFormData] = useState<NftForm>({
    tokenName: '',
    creatorName: '',
    displayName: '',
    nftFiles: [],
    spinRoyaltiesEnabled: true,
    royaltyWallets: [''],
    nftThumbnail: null,
    nftPropertiesEnabled: true,
    spinPercent: 0,
    nftProperties: [{ key: 'background', value: 'red' }],
    sellingOption: '',
    listingPrice: 0,
  });
  const [formDataErrors, setFormDataErrors] = useState<NftFormErrors>({
    tokenNameError: false,
    creatorNameError: false,
    displayNameError: false,
    nftFilesError: false,
    spinRoyaltiesEnabledError: false,
    royaltyWalletsError: false,
    nftThumbnailError: false,
    nftPropertiesEnabledError: false,
    spinPercentError: false,
    nftPropertiesError: false,
    sellingOptionError: true,
    listingPriceError: false,
  });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'checkbox') {
      setFormData({
        ...formData,
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
      setFormData({
        ...formData,
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
  return (
    <div>
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
            formDataErrors={formDataErrors}
            setFormDataErrors={setFormDataErrors}
            setFormData={setFormData}
            formData={formData}
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
            formData={formData}
            setFormData={setFormData}
            handleFormChange={handleFormChange}
          />

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
