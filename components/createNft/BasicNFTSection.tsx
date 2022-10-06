import React, { ChangeEvent } from 'react';
import { NftForm } from '../../utils/Interfaces';
import Input from '../common/Input';
import Tooltip from '../common/Tooltip';

interface BasicNFTSectionProps {
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formData: NftForm;
}

const BasicNFTSection = function ({
  handleFormChange,
  formData,
}: BasicNFTSectionProps) {
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
        labelStyle="mb-2.5"
        type="text"
        name="tokenName"
        value={formData.tokenName}
        placeholder="Display Name"
        onChange={handleFormChange}
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
      />
      <Input
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Creator Name"
        labelStyle="mb-2.5"
        type="text"
        name="creatorName"
        placeholder="Creator Name"
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
        onChange={handleFormChange}
        value={formData.creatorName}
      />
      <Input
        toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
        containerStyles="mt-4"
        labelText="Display Name"
        labelStyle="mb-2.5"
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={formData.displayName}
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
        onChange={handleFormChange}
      />
    </section>
  );
};

export default BasicNFTSection;
