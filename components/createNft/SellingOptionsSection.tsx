import React, { ChangeEvent, useState } from 'react';
import HbarLogo from '../../public/svg/HbarLogo';
import classNames from '../../utils/classNames';
import { sellingOptions } from '../../utils/Constants';
import {
  SellingOption,
  NftForm,
  NftFormErrors,
  StepTwoErrors,
  NftInCollection,
} from '../../utils/Interfaces';

import ErrorMessage from '../common/ErrorMessage';
import Input from '../common/Input';

interface SellingOptionsSectionProps {
  formData?: NftForm | NftInCollection;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formDataErrors?: NftFormErrors | StepTwoErrors;
}

const SellingOptionsSection = function ({
  formDataErrors,
  formData,
  handleFormChange,
}: SellingOptionsSectionProps) {
  const [currentOption, setCurrentOption] = useState<SellingOption>(
    sellingOptions[0]
  );

  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Choose Selling Option</h4>
      <p className="text-sm mt-3">
        Would you like to list your NFT on HashGuild directly?
      </p>
      <div className="my-8 flex gap-x-10 select-none">
        {sellingOptions.map((option, index) => (
          <div
            onClick={() => setCurrentOption(sellingOptions[index])}
            aria-hidden="true"
            key={option.index}
            className={classNames(
              'p-10  shadow-xl select-none rounded-lg border-black flex flex-col items-center justify-center gap-y-1 basis-1/2 py-6 md:py-20 ',
               currentOption?.index === option.index
                ? 'bg-slate-900 dark:bg-white'
                : 'border-2',
            )}
          >

            <option.icon className={`${ currentOption?.index === option.index
                  ? 'stroke-white dark:stroke-black'
                  : 'stroke-black dark:stroke-white'}`} />
            <span
              className={`${
                currentOption?.index === option.index
                  ? 'text-white dark:text-black'
                  : 'text-black dark:text-white'
              }  font-semibold`}
           >{option.name}</span>
          </div>
        ))}
      </div>
      {formDataErrors?.sellingOptionError && (
        <ErrorMessage errorText="Please select one option" />
      )}

      {currentOption!.name === 'Mint & List' && (
        <>
          <h5 className="text-sm font-bold my-6">Set Price</h5>

          <Input
            iconLeft={<HbarLogo className="h-5 w-5" />}
            labelText="Listing Price"
            labelStyle="my-2.5"
            error={formDataErrors!.listingPriceError}
            type="number"
            name="listingPrice"
            errorMessage="Listing Price cannot be empty"
            placeholder="Listing Price"
            className=" w-full  text-black placeholder:text-sm placeholder:text-gray-400 py-1.5 appearance-none "
            onChange={handleFormChange}
            value={formData?.listingPrice}
          />
        </>
      )}
    </section>
  );
};

export default SellingOptionsSection;
