import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
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
  };
  const deleteInput = (walletIndex: number) => {
    const updatedArray = formData.royaltyWallets.filter(
      (_, index) => index !== walletIndex,
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

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newArr = formData.royaltyWallets;
    if (e.target.name === 'fee') {
      newArr[index].fee = +e.target.value;
      if (royaltySum(newArr) > 100) {
        setFormDataErrors({
          ...formDataErrors,
          splitPercentError: true,
        });
      } else {
        setFormDataErrors({
          ...formDataErrors,
          splitPercentError: false,
        });
      }
    } else if (e.target.name === 'accountId') {
      newArr[index].accountId = e.target.value;
    }
    setFormData({ ...formData, royaltyWallets: newArr });
  };

  useEffect(() => {
    function resetRoyalties() {
      if (!formData.splitRoyaltiesEnabled) {
        setFormData((prev) => ({
          ...prev,
          royaltyWallets: [{ fee: 0, accountId: '' }],
        }));
        setFormDataErrors((errors) => ({
          ...errors,
          [`splitPercentError`]: false,
        }));
      }
    }
    resetRoyalties();
  }, [formData.splitRoyaltiesEnabled, setFormData, setFormDataErrors]);

  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Royalties</h4>
      <p className="text-sm mt-3">
        The files will be minted in your NFT. The order in which the files are
        displayed represents the order of the files on the NFT. The NFT can
        include up to 2 files including the thumbnail.
      </p>
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Total Amount</h5>
        <h5>{` ${royaltySum(formData.royaltyWallets)} %`}</h5>
      </span>
      <div className="w-full h-3 border rounded-lg overflow-hidden">
        <div
          className="h-full bg-black"
          style={{ width: `${royaltySum(formData.royaltyWallets)}%` }}
        />
      </div>
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
              inputContainerStyles={
                wallet.fee === 0 && formDataErrors.splitPercentError
                  ? 'border-red-400'
                  : ''
              }
              errorMessage=""
              error={formDataErrors.splitPercentError}
              placeholder="Fee in %"
              className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
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
                wallet?.accountId?.length === 0 &&
                formDataErrors.splitPercentError
                  ? 'border-red-400'
                  : ''
              }
              name="accountId"
              errorMessage=""
              error={formDataErrors.splitPercentError}
              placeholder="Account id"
              className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
              onChange={(e) => {
                handleChange(index, e);
              }}
              iconRight={
                index > 0 && (
                  <section
                    role="presentation"
                    className="p-2  h-6 w-6 flex items-center bg-gray-300 rounded-full hover:bg-gray-300/80 "
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
          <ErrorMessage errorText="The distribution should not exceed 100%. Please revise the total royalty fee or change the allocation. " />
        )}
      </div>
      {formData.splitRoyaltiesEnabled && (
        <Button
          title="Add Wallet"
          disabled={!formData.splitRoyaltiesEnabled}
          className=" w-1/2 bg-black text-white rounded-md mt-5 self-end disabled:bg-black/40 "
          onClick={addInput}
        />
      )}
    </section>
  );
};

export default CollectionRoyaltiesSection;
