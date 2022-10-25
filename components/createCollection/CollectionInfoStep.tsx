import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { CollectionForm, StepOneErrors } from '../../utils/Interfaces';
import Button from '../global/Button';
import BasicCollectionSection from './BasicCollectionSection';
import CollectionRoyaltiesSection from './CollectionRoyaltiesSection';

export interface CollectionInfoStepProps {
  setStep: Dispatch<SetStateAction<number>>;
  handleFormChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  formData: CollectionForm;
  setFormData: Dispatch<SetStateAction<CollectionForm>>;
  stepOneErrors: StepOneErrors;
  setStepOneErrors: Dispatch<SetStateAction<StepOneErrors>>;
}
const CollectionInfoStep: FC<CollectionInfoStepProps> = function ({
  setStep,
  handleFormChange,
  formData,
  setFormData,
  setStepOneErrors,
  stepOneErrors,
}) {
  const checkFormValidated = () => {
    const validated = Object.values(stepOneErrors).every(
      (item) => item === false,
    );
    return validated;
  };

  return (
    <>
      <h1 className="text-3xl mt-10 font-bold">Create Collection</h1>

      <BasicCollectionSection
        formDataErrors={stepOneErrors}
        formData={formData}
        handleFormChange={handleFormChange}
      />
      <hr />
      <CollectionRoyaltiesSection
        formDataErrors={stepOneErrors}
        setFormDataErrors={setStepOneErrors}
        setFormData={setFormData}
        formData={formData}
        handleFormChange={handleFormChange}
      />
      <hr />
      <Button
        onClick={() => {
          setStep((prev) => prev + 1);
        }}
        disabled={!checkFormValidated()}
        title="Continue"
        className="w-full bg-black mt-5 text-white dark:bg-white dark:text-black rounded-md disabled:bg-black/40"
      />
    </>
  );
};

export default CollectionInfoStep;
