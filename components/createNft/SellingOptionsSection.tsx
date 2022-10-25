import React from 'react';
// import HbarLogo from '../../public/svg/HbarLogo';
import classNames from '../../utils/classNames';
import { sellingOptions } from '../../utils/Constants';

// import ErrorMessage from '../common/ErrorMessage';

// interface SellingOptionsSectionProps {
//   formData?: NftForm | NftInCollection;
//   // handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   setFormData?: Dispatch<SetStateAction<NftForm | NftInCollection>>;
//   formDataErrors?: NftFormErrors | StepTwoErrors;
//   setFormDataErrors?: Dispatch<SetStateAction<NftFormErrors | StepTwoErrors>>;
// }

const SellingOptionsSection = function () {
  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Choose Selling Option</h4>
      <p className="text-sm mt-3">
      Would you like to list your NFT on HashGuild directly?
      </p>
      <div className="my-8 flex gap-x-10 select-none">
        {sellingOptions.map((option) => (
          <div
            aria-hidden="true"
            key={option.index}
            className={classNames(
              'flex flex-col items-center justify-center gap-y-1 basis-1/2 py-6 md:py-20 border shadow-xl',
              option.index === 1
                ? 'border-black'
                : 'pointer-events-none  bg-black/50 dark:bg-white/50',
            )}
          >
            <option.icon 
            className='stroke-black dark:stroke-white'
            />
            <p>{option.name}</p>
            {option.index === 2 && (
              <p className="text-xs text-white/80 dark:text-white/40">Coming soon.</p>
            )}
          </div>
        ))}
      </div>
      {/* {formDataErrors.sellingOptionError && (
        <ErrorMessage errorText="Please select one option" />
      )} */}

      {/* <HbarLogo /> */}
      {/* {currentOption?.name === 'Mint and Sell' && (
        <>
          <h5 className="text-sm font-bold my-6">Set Price</h5>

          <Input
            iconLeft={<HbarLogo className="h-5 w-5" />}
            labelText="Listing Price"
            labelStyle="my-2.5"
            error={formDataErrors.listingPriceError}
            type="number"
            name="listingPrice"
            errorMessage="Listing Price cannot be empty"
            placeholder="Listing Price"
            className=" w-full  text-black placeholder:text-sm placeholder:text-gray-400 py-1.5 appearance-none "
            onChange={handleFormChange}
            value={formData.listingPrice}
          />
        </>
      )} */}
    </section>
  );
};

export default SellingOptionsSection;
