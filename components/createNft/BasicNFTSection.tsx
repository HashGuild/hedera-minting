import React, { ChangeEvent } from 'react';
import {
  nftErrorType,
  NftForm,
  NftFormErrors,
  nftFormType,
  NftInCollection,
  StepTwoErrors,
} from '../../utils/Interfaces';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Tooltip from '../common/Tooltip';

interface BasicNFTSectionProps {
  handleFormChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  formData: NftForm | NftInCollection;
  formDataErrors: NftFormErrors | StepTwoErrors;
}

const BasicNFTSection = function ({
  handleFormChange,
  formData,
  formDataErrors,
}: BasicNFTSectionProps) {
  const { tokenNameError, creatorNameError } = formDataErrors;
  const isNftFormError = nftErrorType(formDataErrors);
  const isNftForm = nftFormType(formData);
  return (
    <section className="my-10">
      <div className="flex mt-8 items-center justify-between">
        <h4 className="text-lg font-bold">Basic NFT Information</h4>
        <Tooltip>
          <section className="text-xs w-40 bg-white">
            <p className="pb-1 border-b p-3 border-black font-semibold">
              Basic Information
            </p>
            <p className="p-3">
              Basic Information The name, description and lorem ipsum dolor sit
              amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
              ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
              sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
              lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
              dolor sit amet
            </p>
          </section>
        </Tooltip>
      </div>

      <Input
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Token Name"
        labelStyle="my-2.5"
        type="text"
        required
        name="tokenName"
        error={tokenNameError}
        errorMessage="Token Name cannot be empty."
        value={formData.tokenName}
        placeholder="Display Name"
        onChange={handleFormChange}
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5 bg-transparent"
      />

      <Input
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Creator Name"
        labelStyle="my-2.5"
        type="text"
        error={creatorNameError}
        errorMessage="Creator Name cannot be empty."
        required
        name="creatorName"
        placeholder="Creator Name"
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
        onChange={handleFormChange}
        value={formData.creatorName}
      />

      {isNftForm && (
        <Input
          toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
          containerStyles="mt-4"
          labelText="Display Name"
          labelStyle="my-2.5"
          required
          type="textArea"
          name="displayName"
          error={isNftFormError && formDataErrors.displayNameError}
          errorMessage="Display Name cannot be empty."
          value={formData.displayName}
          placeholder="Display Name"
          className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
          onChange={handleFormChange}
        />
      )}
      <TextArea
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Description"
        labelStyle="my-2.5"
        required
        type="text"
        name="description"
        error={formDataErrors.descriptionError}
        errorMessage="Description cannot be empty."
        value={formData.description}
        placeholder="Description"
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5 focus:ring-0 outline-none"
        onChange={handleFormChange}
      />
    </section>
  );
};

export default BasicNFTSection;
