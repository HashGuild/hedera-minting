import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import DeleteIcon from '../../public/svg/DeleteIcon';
import {
  CollectionForm,
  StepOneErrors,
  UserWalletRoyalty,
} from '../../utils/Interfaces';
import ErrorMessage from '../common/ErrorMessage';
import Input from '../common/Input';
import Switch from '../common/Switch';
import Button from '../global/Button';
import isAccountIdValid from '../../utils/isAccountIdValid';

interface CollectionRoyaltiesSectionProps {
  formData: CollectionForm;
  setFormData: Dispatch<SetStateAction<CollectionForm>>;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formDataErrors: StepOneErrors;
  setFormDataErrors: Dispatch<SetStateAction<StepOneErrors>>;
}

const CollectionRoyaltiesSection = function ({
  formData,
  handleFormChange,
  setFormData,
  setFormDataErrors,
  formDataErrors,
}: CollectionRoyaltiesSectionProps) {
  const { splitPercentError } = formDataErrors;
  const addInput = () => {
    const newWallet: UserWalletRoyalty = { fee: 0, accountId: '' };
    setFormData({
      ...formData,
      royaltyWallets: [...formData.royaltyWallets, { ...newWallet }],
    });
    setFormDataErrors({
      ...formDataErrors,
      feeError: true,
      accountIdError: true,
      splitPercentError: false,
    });
  };
  const deleteInput = (walletIndex: number) => {
    const updatedArray = formData.royaltyWallets.filter(
      (_, index) => index !== walletIndex
    );
    setFormData({
      ...formData,
      royaltyWallets: updatedArray,
    });
  };
  const royaltySum = (newArr: UserWalletRoyalty[]): number => {
    let sum: number = 0;
    newArr.forEach((item) => {
      sum += item.fee;
    });
    return sum;
  };
  const validatateRoyaltySum = (
    wallets: UserWalletRoyalty[],
    feeError: boolean
  ) => {
    if (royaltySum(wallets) > 100) {
      setFormDataErrors({
        ...formDataErrors,
        splitPercentError: true,
        feeError,
      });
    } else {
      setFormDataErrors({
        ...formDataErrors,
        splitPercentError: false,
        feeError,
      });
    }
  };

  const validateSplitFee = (
    e: ChangeEvent<HTMLInputElement>,
    wallets: UserWalletRoyalty[]
  ) => {
    if (+e.target.value === 0) {
      setFormDataErrors({
        ...formDataErrors,
        feeError: true,
      });
      validatateRoyaltySum(wallets, true);
    } else {
      setFormDataErrors({
        ...formDataErrors,
        feeError: false,
      });
      validatateRoyaltySum(wallets, false);
    }
  };
  const validateSplitAccount = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setFormDataErrors({
        ...formDataErrors,
        accountIdError: true,
      });
    } else {
      setFormDataErrors({
        ...formDataErrors,
        accountIdError: false,
      });
    }
  };

  async function checkAccountIdAndHandleChange (e: ChangeEvent<HTMLInputElement>) {
    isAccountIdValid(e, formDataErrors, setFormDataErrors);
  }

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newArr = formData.royaltyWallets;
    if (e.target.name === 'fee') {
      newArr[index].fee = +e.target.value;
      validateSplitFee(e, newArr);
    } else if (e.target.name === 'accountId') {
      newArr[index].accountId = e.target.value;
      validateSplitAccount(e);
    }

    setFormData({ ...formData, royaltyWallets: newArr });
  };

  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Royalties</h4>
      <p className="text-sm mt-3">
        Royalties is the sell-on percentage fee that the creator of the NFT(s)
        will receive every time a sale is made on secondary markets.
      </p>
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Split Royalties</h5>
        <Switch
          labelFor="splitRoyaltiesEnabled"
          checked={formData.splitRoyaltiesEnabled}
          name="splitRoyaltiesEnabled"
          onChange={(e) => {
            handleFormChange(e);
          }}
        />
      </span>

      <div>
        {formData?.royaltyWallets.map((wallet, index: number) => (
          <div className="flex gap-2" key={index.toFixed(1)}>
            <Input
              containerStyles="mt-4 basis-1/4"
              required
              labelText={index === 0 ? 'Key' : ''}
              labelStyle="my-2.5"
              type="number"
              name="fee"
              value={wallet.fee === 0 ? '' : wallet.fee}
              inputContainerStyles={
                formDataErrors.feeError ? 'border-red-400' : ''
              }
              onWheel={(e) => e.currentTarget.blur()}
              errorMessage=""
              error={formDataErrors.feeError}
              placeholder="Fee in %"
              className="w-full  text-black placeholder:text-sm placeholder:text-gray-400 py-1.5"
              onChange={(e) => {
                handleChange(index, e);
              }}
            />
            <Input
              containerStyles="mt-4 basis-3/4"
              labelText={index === 0 ? 'Value' : ''}
              labelStyle="my-2.5"
              type="text"
              required
              inputContainerStyles={
                formDataErrors.accountIdError ? 'border-red-400' : ''
              }
              name="accountId"
              errorMessage="Account Id needs to be valid"
              value={wallet.accountId}
              error={formDataErrors.accountIdError}
              placeholder="Account Id"
              className=" w-full  text-black placeholder:text-sm placeholder:text-gray-400 py-1.5   "
              onChange={(e) => {
                checkAccountIdAndHandleChange(e); handleChange(index, e); 
              }}
              iconRight={
                index > 0 && (
                  <section
                    role="presentation"
                    className="p-2 h-6 w-6 flex items-center bg-gray-300 rounded-full hover:bg-gray-300/80 cursor-pointer"
                    onClick={() => deleteInput(index)}
                  >
                    <DeleteIcon />
                  </section>
                )
              }
            />
          </div>
        ))}
        {splitPercentError && (
          <ErrorMessage errorText="The distribution should not exceed 100%. Please revise the total royalty fee or change the allocation." />
        )}
      </div>
      {formData.splitRoyaltiesEnabled && (
        <Button
          title="Add Account Id"
          disabled={!formData.splitRoyaltiesEnabled}
          className="w-1/2 bg-black text-white dark:text-black dark:bg-white rounded-md mt-5 self-end disabled:bg-black/40"
          onClick={addInput}
          buttonHeight={10}
        />
      )}
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Total Amount of Royalty</h5>
        <h5>{` ${royaltySum(formData.royaltyWallets)} %`}</h5>
      </span>
      <div className="w-full h-3 border rounded-lg overflow-hidden">
        <div
          className="h-full bg-black"
          style={{ width: `${royaltySum(formData.royaltyWallets)}%` }}
        />
      </div>
    </section>
  );
};

export default CollectionRoyaltiesSection;
