import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import DeleteIcon from '../../public/svg/DeleteIcon';
import { CollectionForm, StepOneErrors } from '../../utils/Interfaces';
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
    const newWallet = '';
    setFormData({
      ...formData,
      royaltyWallets: [...formData.royaltyWallets, newWallet],
    });
  };
  const deleteInput = (index: number) => {
    const updatedArray = formData.royaltyWallets.filter(
      (_, walletIndex) => walletIndex !== index,
    );
    setFormData({
      ...formData,
      royaltyWallets: updatedArray,
    });
  };
  const royaltySum = (): number => {
    let sum: number = 0;
    const numberArray = formData.royaltyWallets.map(Number);
    numberArray.forEach((item) => {
      sum += item;
    });
    return sum;
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newArr = formData.royaltyWallets;
    newArr[index] = e.target.value;
    setFormData({ ...formData, royaltyWallets: newArr });
    if (royaltySum() > formData.splitPercent) {
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
  };

  useEffect(() => {
    function resetRoyalties() {
      if (!formData.splitRoyaltiesEnabled) {
        setFormData((prev) => ({
          ...prev,
          splitPercent: 0,
          royaltyWallets: [''],
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
        <h5>{` ${formData?.splitPercent} %`}</h5>
      </span>

      <input
        type="range"
        className="w-full  h-2 touch-pan-y accent-black"
        min={0}
        max={50}
        step={0.5}
        disabled={!formData.splitRoyaltiesEnabled}
        value={formData?.splitPercent}
        onChange={handleFormChange}
        name="splitPercent"
      />
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Spin Royalties</h5>
        <Switch
          labelFor="splitRoyaltiesEnabled"
          checked={formData.splitRoyaltiesEnabled}
          name="splitRoyaltiesEnabled"
          onChange={(e) => {
            handleFormChange(e);
          }}
        />
      </span>

      {formData?.splitRoyaltiesEnabled && (
        <div>
          {formData?.royaltyWallets.map((wallet, index: number) => (
            <Input
              key={index.toFixed(1)}
              toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
              containerStyles="mt-4 "
              labelText={`Royalty Wallet ${index + 1}`}
              labelStyle="my-2.5"
              type="text"
              name="royaltyWallet"
              required
              inputContainerStyles={
                splitPercentError && formData.royaltyWallets.at(-1) === wallet
                  ? 'border-red-400 stroke-red-400'
                  : ''
              }
              onChange={(e) => {
                handleChange(index, e);
              }}
              placeholder={`${(100 / formData.royaltyWallets.length).toFixed(
                0,
              )}%`}
              className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
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
              error={splitPercentError}
              errorMessage=""
            />
          ))}
          {splitPercentError && (
            <ErrorMessage errorText="The distribution is not correct. Please revise the total royalty fee or change the allocation. " />
          )}
        </div>
      )}
      <Button
        title="Add Wallet"
        disabled={!formData.splitRoyaltiesEnabled}
        className=" w-1/2 bg-black text-white rounded-md mt-5 self-end disabled:bg-black/40 "
        onClick={addInput}
      />
    </section>
  );
};

export default CollectionRoyaltiesSection;
