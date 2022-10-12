import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import HbarLogo from '../../public/svg/HbarLogo';
import classNames from '../../utils/classNames';
import { sellingOptions } from '../../utils/Constants';
import { NftForm, NftFormErrors, SellingOption } from '../../utils/Interfaces';
import ErrorMessage from '../common/ErrorMessage';
import Input from '../common/Input';

interface SellingOptionsSectionProps {
  formData: NftForm;
  setFormData: Dispatch<SetStateAction<NftForm>>;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formDataErrors: NftFormErrors;
  setFormDataErrors: Dispatch<SetStateAction<NftFormErrors>>;
}

const SellingOptionsSection = function ({
  formData,
  setFormData,
  handleFormChange,
  formDataErrors,
  setFormDataErrors,
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
      <div className="my-8 flex gap-x-10 select-none">
        {sellingOptions.map((option) => (
          <div
            aria-hidden="true"
            key={option.index}
            onClick={() => {
              setCurrentOption(option);
              setFormDataErrors({
                ...formDataErrors,
                sellingOptionError: false,
              });
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
      {formDataErrors.sellingOptionError && (
        <ErrorMessage errorText="Please select one option" />
      )}

      {/* <HbarLogo /> */}
      {currentOption?.name === 'Mint and Sell' && (
        <>
          <h5 className="text-sm font-bold my-6">Set Price</h5>

          <Input
            iconLeft={<HbarLogo className="h-5 w-5" />}
            labelText="Listing Price"
            labelStyle="my-2.5"
            type="number"
            name="listingPrice"
            placeholder="Listing Price"
            className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5 appearance-none "
            onChange={handleFormChange}
            value={formData.listingPrice}
          />
          {formDataErrors.listingPriceError && (
            <ErrorMessage errorText="Listing Price cannot be empty" />
          )}
        </>
      )}
    </section>
  );
};

export default SellingOptionsSection;
