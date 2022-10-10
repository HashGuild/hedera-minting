import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import Steps from '../components/common/Steps';
import AddNftStep from '../components/createCollection/AddNftStep';
import CollectionInfoStep from '../components/createCollection/CollectionInfoStep';
import VerifyCollectionMint from '../components/createCollection/VerifyCollectionMint';
import { CollectionForm, StepOneErrors } from '../utils/Interfaces';

const CreateNft: NextPage = function () {
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState<CollectionForm>({
    tokenName: '',
    creatorName: '',
    displayName: '',
    spinRoyaltiesEnabled: true,
    royaltyWallets: [''],
    spinPercent: 0,
    nfts: [],
  });

  const [stepOneErrors, setStepOneErrors] = useState<StepOneErrors>({
    tokenNameError: true,
    creatorNameError: true,
    displayNameError: true,
    spinPercentError: false,
    spinRoyaltiesEnabledError: true,
    royaltyWalletsError: true,
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
        setStepOneErrors({
          ...stepOneErrors,
          [`${event.target.name}Error`]: true,
        });
      } else {
        setStepOneErrors({
          ...stepOneErrors,
          [`${event.target.name}Error`]: false,
        });
      }
      setFormData({
        ...formData,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  };

  const renderSteps = function () {
    if (step === 1) {
      return (
        <CollectionInfoStep
          setFormData={setFormData}
          setStep={setStep}
          handleFormChange={handleFormChange}
          setStepOneErrors={setStepOneErrors}
          stepOneErrors={stepOneErrors}
          formData={formData}
        />
      );
    }
    if (step === 2) {
      return (
        <AddNftStep
          setStep={setStep}
          setFormData={setFormData}
          formData={formData}
        />
      );
    }
    if (step === 3) return <VerifyCollectionMint formData={formData} />;
    return null;
  };
  return (
    <>
      <Steps steps={[1, 2, 3]} currentStepIndex={step} />
      {renderSteps()}
    </>
  );
};

export default CreateNft;
