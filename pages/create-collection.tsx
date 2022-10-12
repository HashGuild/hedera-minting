import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import Steps from '../components/common/Steps';
import AddNftStep from '../components/createCollection/AddNftStep';
import CollectionInfoStep from '../components/createCollection/CollectionInfoStep';
import VerifyCollectionMint from '../components/createCollection/VerifyCollectionMint';
import { CollectionForm, StepOneErrors } from '../utils/Interfaces';
import useWarningOnExit from '../utils/useWarnIfUnsavedChanges';

const CreateNft: NextPage = function () {
  useWarningOnExit(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CollectionForm>({
    tokenName: '',
    creatorName: '',
    displayName: '',
    splitRoyaltiesEnabled: false,
    royaltyWallets: [''],
    splitPercent: 0,
    nfts: [],
  });
  const [stepOneErrors, setStepOneErrors] = useState<StepOneErrors>({
    tokenNameError: true,
    creatorNameError: true,
    displayNameError: true,
    splitPercentError: false,
  });
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.type === 'checkbox') {
      setFormData({
        ...formData,
        [event.currentTarget.name]: event.currentTarget.checked,
      });
      if (
        !event.currentTarget.checked &&
        event.currentTarget.name === 'splitRoyaltiesEnabled'
      ) {
        setStepOneErrors({
          ...stepOneErrors,
          [`splitPercentError`]: false,
        });
      }
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
