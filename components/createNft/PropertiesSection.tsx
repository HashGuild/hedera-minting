import React, { ChangeEvent } from 'react';
import { NftForm } from '../../utils/Interfaces';
import Input from '../common/Input';
import Switch from '../common/Switch';
import Button from '../global/Button';

interface PropertiesSectionProps {
  formData: NftForm;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PropertiesSection = function ({
  formData,
  handleFormChange,
}: PropertiesSectionProps) {
  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Properties</h4>
      <p className="text-sm mt-3">
        NFTs can contain property data, featuring custom attributes used for
        e.g. rarity, more information and distinguishing NFTs.
      </p>
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Add Custom Properties</h5>
        <Switch
          labelFor="nftPropertiesEnabled"
          checked={formData.nftPropertiesEnabled}
          name="nftPropertiesEnabled"
          onChange={handleFormChange}
        />
      </span>

      {formData?.nftPropertiesEnabled && (
        <>
          {formData?.nftProperties.map((properties, index: number) => (
            <div className="flex gap-2" key={index.toFixed(1)}>
              <Input
                containerStyles="mt-4 basis-1/4 "
                labelText="Key"
                labelStyle="mb-2.5"
                type="text"
                name="creatorName"
                placeholder="Key"
                className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
                onChange={handleFormChange}
              />
              <Input
                containerStyles="mt-4 basis-3/4 "
                labelText="Value"
                labelStyle="mb-2.5"
                type="text"
                name="creatorName"
                placeholder="Value"
                className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
                onChange={handleFormChange}
              />
            </div>
          ))}
          <Button
            title="Add Properties"
            className=" w-1/2 bg-black text-white rounded-md mt-5 self-end "
            onClick={() => console.log('first')}
          />
        </>
      )}
    </section>
  );
};

export default PropertiesSection;
