import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import VerifyAndMintSection from '../components/common/VerifyAndMintSection';
import BasicNFTSection from '../components/createNft/BasicNFTSection';
import FileUploadSection from '../components/createNft/FileUploadSection';
import PropertiesSection from '../components/createNft/PropertiesSection';
import RoyaltiesSection from '../components/createNft/RoyaltiesSection';
import SellingOptionsSection from '../components/createNft/SellingOptionsSection';
import Button from '../components/global/Button';
import { NftForm } from '../utils/Interfaces';

const CreateNft: NextPage = function () {
  const [renderConfirmMint, setRenderConfirmMint] = useState(false);
  const [formData, setFormData] = useState<NftForm>({
    tokenName: '',
    creatorName: '',
    displayName: '',
    nftFiles: [],
    spinRoyaltiesEnabled: true,
    royaltyWallets: ['1', '2'],
    nftPropertiesEnabled: true,
    spinPercent: 23,
    nftProperties: [{ key: 'background', value: 'red' }],
    sellingOption: '',
    listingPrice: '',
  });
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'checkbox') {
      setFormData({
        ...formData,
        [event.currentTarget.name]: event.currentTarget.checked,
      });
    } else {
      setFormData({
        ...formData,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
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
          <FileUploadSection formData={formData} setFormData={setFormData} />

          <BasicNFTSection
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <hr />
          <RoyaltiesSection
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <hr />
          <PropertiesSection
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <hr />
          <SellingOptionsSection
            formData={formData}
            setFormData={setFormData}
            handleFormChange={handleFormChange}
          />

          <hr />

          <Button
            onClick={() => {
              setRenderConfirmMint(true);
            }}
            title="Continue"
            className="w-full bg-black mt-5 text-white rounded-md"
          />
        </>
      )}
    </div>
  );
};

export default CreateNft;
