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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: NftForm | NftInCollection;
  formDataErrors: NftFormErrors | StepTwoErrors;
}

const BasicNFTSection = function ({
  handleFormChange,
  formData,
  formDataErrors,
}: BasicNFTSectionProps) {
  const { creatorNameError, descriptionError, displayNameError } =
    formDataErrors;
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
              {isNftForm ? 'The token name is the unique collection which your 1/1 NFT will be displayed under.' : 'In this section, you create the Token of your Collection.'}              
            </p>
          </section>
        </Tooltip>
      </div>

      {isNftForm && (
        <Input
          containerStyles="mt-4"
          labelText="Token Name"
          labelStyle="my-2.5"
          type="text"
          required
          name="tokenName"
          error={isNftFormError && formDataErrors.tokenNameError}
          errorMessage="Token Name cannot be empty."
          value={formData.tokenName}
          placeholder="Token Name"
          onChange={handleFormChange}
          className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5 bg-transparent"
          helpModalHeader="What is the Token Name?"
          helpModalText="The Token Name is connected to the Token ID that's being created. Whenever somebody searches for the token ID, this name will show (similar to collection name)."
          helpModalImgSrc="https://s3.amazonaws.com/appforest_uf/f1666865583815x623599300014247400/Token%20Name_assistant_hashguild_minting.png"
        />
      )}
      <Input
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
        helpModalHeader="What is the Creator Name?"
        helpModalText="The Creator Name is how your NFT will be identified by other users on secondary marketplaces."
        helpModalImgSrc="https://s3.amazonaws.com/appforest_uf/f1666865602967x321530980968776100/Creator%20Name_assistant_hashguild_minting.png"
      />

      {isNftForm && (
        <Input
          containerStyles="mt-4"
          labelText="Token Symbol"
          labelStyle="my-2.5"
          type="text"
          error={isNftFormError && formDataErrors.tokenSymbolError}
          errorMessage="Token Symbol cannot be empty."
          required
          name="tokenSymbol"
          placeholder="Token Symbol"
          className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
          onChange={handleFormChange}
          value={formData.tokenSymbol}
          helpModalHeader="What is the Token Symbol?"
          helpModalText="The Token Symbol varies - either it is an collection image or it is an abbreviation of the token name."
          helpModalImgSrc="https://s3.amazonaws.com/appforest_uf/f1666865598053x543240945645589300/Token%20Symbol_assistant_hashguild_minting.png"
        />
      )}

      <Input
        containerStyles="mt-4"
        labelText="Display Name"
        labelStyle="my-2.5"
        required
        type="textArea"
        name="displayName"
        error={displayNameError}
        errorMessage="Display Name cannot be empty."
        value={formData.displayName}
        placeholder="Display Name"
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
        onChange={handleFormChange}
        helpModalHeader="What is the Display Name?"
        helpModalText="The Display Name is the name that will be visible to all users interested in your NFT. It is the primary name of the NFT itself. When minting a single NFT, the Display NFT name can be the same as the Token name, but it's up to you, maybe you want to give it a nickname?"
        helpModalImgSrc="https://s3.amazonaws.com/appforest_uf/f1666866067841x946251467155223800/Display%20Name_assistant_hashguild_minting_v2.png"
      />
      <TextArea
        containerStyles="mt-4"
        labelText="Description"
        labelStyle="my-2.5"
        required
        type="text"
        name="description"
        error={descriptionError}
        errorMessage="Description cannot be empty."
        value={formData.description}
        placeholder="Description"
        className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5 focus:ring-0 outline-none"
        onChange={handleFormChange}
        helpModalHeader="What is the Description?"
        helpModalText="The description of your NFT will be tied to the NFT itself, meaning it will always be visible for anyone to see.
        Do not include links in the description.
        Enter any information you want (utility, use cases, backstory, etc…), but please note that the description of your NFT can never be changed."
        helpModalImgSrc="https://s3.amazonaws.com/appforest_uf/f1666866125250x899364638017431800/Description_assistant_hashguild_minting_v2.png"
      />
    </section>
  );
};

export default BasicNFTSection;
