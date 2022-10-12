import React, { ChangeEvent } from 'react';
import { NftForm, NftFormErrors } from '../../utils/Interfaces';
import ErrorMessage from '../common/ErrorMessage';
import Input from '../common/Input';
import Tooltip from '../common/Tooltip';

interface BasicNFTSectionProps {
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formData: NftForm;
  formDataErrors: NftFormErrors;
}

const BasicNFTSection = function ({
  handleFormChange,
  formData,
  formDataErrors,
}: BasicNFTSectionProps) {
  const { tokenNameError, creatorNameError, displayNameError } = formDataErrors;
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
        value={formData.tokenName}
        placeholder="Display Name"
        onChange={handleFormChange}
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
      />
      {tokenNameError && (
        <ErrorMessage errorText="Token Name cannot be empty." />
      )}
      <Input
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Creator Name"
        labelStyle="my-2.5"
        type="text"
        required
        name="creatorName"
        placeholder="Creator Name"
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
        onChange={handleFormChange}
        value={formData.creatorName}
      />
      {creatorNameError && (
        <ErrorMessage errorText="Creator Name cannot be empty." />
      )}

      <Input
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Display Name"
        labelStyle="my-2.5"
        required
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={formData.displayName}
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
        onChange={handleFormChange}
      />
      {displayNameError && (
        <ErrorMessage errorText="Display Name cannot be empty." />
      )}
    </section>
  );
};

export default BasicNFTSection;
