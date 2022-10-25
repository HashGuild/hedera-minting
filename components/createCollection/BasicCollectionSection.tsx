import React, { ChangeEvent } from 'react';
import { CollectionForm, StepOneErrors } from '../../utils/Interfaces';
import Input from '../common/Input';
import Tooltip from '../common/Tooltip';

interface BasicCollectionSectionProps {
  handleFormChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  formData: CollectionForm;
  formDataErrors: StepOneErrors;
}

const BasicCollectionSection = function ({
  handleFormChange,
  formData,
  formDataErrors,
}: BasicCollectionSectionProps) {
  const { tokenNameError, creatorNameError, tokenSymbolError } = formDataErrors;
  return (
    <section className="my-10">
      <div className="flex mt-8 items-center justify-between">
        <h4 className="text-lg font-bold">Basic Collection Information</h4>
        <Tooltip>
          <section className="text-xs w-40 bg-white">
            <p className="pb-1 border-b p-3 border-black font-semibold">
              Basic Information
            </p>
            <p className="p-3">
              In this section, you create the Token of your Collection.
            </p>
          </section>
        </Tooltip>
      </div>

      <Input
        containerStyles="mt-4"
        labelText="Token Name"
        labelStyle="my-2.5"
        type="text"
        required
        name="tokenName"
        value={formData.tokenName}
        placeholder="Display Name"
        onChange={handleFormChange}
        error={tokenNameError}
        errorMessage="Token Name cannot be empty."
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
        helpModalHeader='What is the Token Name?'
        helpModalText='The Token Name is connected to the Token ID that&apos;s being created. Whenever somebody searches for the token ID, this name will show (similar to collection name).'
        helpModalImgSrc='https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
      />

      <Input
        containerStyles="mt-4"
        labelText="Creator Name"
        labelStyle="my-2.5"
        type="text"
        required
        name="creatorName"
        error={creatorNameError}
        errorMessage="Creator Name cannot be empty."
        placeholder="Creator Name"
        className=" w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
        onChange={handleFormChange}
        value={formData.creatorName}
        helpModalHeader='What is the Creator Name?'
        helpModalText='The Creator Name is how your NFT will be identified by other users on secondary marketplaces.'
        helpModalImgSrc='https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
      />

      <Input
        containerStyles="mt-4"
        labelText="Token Symbol"
        labelStyle="my-2.5"
        type="text"
        error={tokenSymbolError}
        errorMessage="Token Symbol cannot be empty."
        required
        name="tokenSymbol"
        placeholder="Token Symbol"
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
        onChange={handleFormChange}
        value={formData.tokenSymbol}
        helpModalHeader='What is the Token Symbol?'
        helpModalText='The Token Symbol varies - either is an collection image or it is an abbreviation of the token name.'
        helpModalImgSrc='https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
      />
    </section>
  );
};

export default BasicCollectionSection;
