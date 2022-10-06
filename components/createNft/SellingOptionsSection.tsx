import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import HbarLogo from '../../public/svg/HbarLogo';
import classNames from '../../utils/classNames';
import { sellingOptions } from '../../utils/Constants';
import { NftForm, SellingOption } from '../../utils/Interfaces';
import Input from '../common/Input';

interface SellingOptionsSectionProps {
  formData: NftForm;
  setFormData: Dispatch<SetStateAction<NftForm>>;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SellingOptionsSection = function ({
  formData,
  setFormData,
  handleFormChange,
}: SellingOptionsSectionProps) {
  const [currentOption, setCurrentOption] = useState<SellingOption>();
  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Choose Selling Option</h4>
      <p className="text-sm mt-3">
        Decide if you would like to only mint the NFT or list directly on
        HashGuild. After minting, the NFT is accesible on your HashGuild
        account.
      </p>
      <div className="my-8 flex gap-x-10">
        {sellingOptions.map((option) => (
          <div
            aria-hidden="true"
            key={option.index}
            onClick={() => {
              setCurrentOption(option);
              setFormData({ ...formData, sellingOption: option.name });
            }}
            className={classNames(
              'flex flex-col items-center justify-center gap-y-1 basis-1/2 py-6 border shadow-xl',
              currentOption?.index === option.index ? 'border-black' : '',
            )}
          >
            <option.icon />
            <p>{option.name}</p>
          </div>
        ))}
      </div>
      <h5 className="text-sm font-bold my-6">Set Price</h5>

      {/* <HbarLogo /> */}
      <Input
        iconLeft={<HbarLogo className="h-5 w-5" />}
        labelText="Listing Price"
        labelStyle="mb-2.5"
        type="text"
        name="creatorName"
        placeholder="Listing Price"
        className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5 "
        onChange={handleFormChange}
        value={formData.listingPrice}
      />
    </section>
  );
};

export default SellingOptionsSection;
