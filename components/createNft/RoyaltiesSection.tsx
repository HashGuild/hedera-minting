import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import DeleteIcon from '../../public/svg/DeleteIcon';
import { NftForm, NftFormErrors } from '../../utils/Interfaces';
import ErrorMessage from '../common/ErrorMessage';
import Input from '../common/Input';
import Switch from '../common/Switch';
import Button from '../global/Button';

interface RoyaltiesSectionProps {
  formData: NftForm;
  setFormData: Dispatch<SetStateAction<NftForm>>;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formDataErrors: NftFormErrors;
  setFormDataErrors: Dispatch<SetStateAction<NftFormErrors>>;
}

const RoyaltiesSection = function ({
  formData,
  handleFormChange,
  setFormData,
  setFormDataErrors,
  formDataErrors,
}: RoyaltiesSectionProps) {
  const { spinPercentError } = formDataErrors;
  const addInput = () => {
    const newWallet = '';
    setFormData({
      ...formData,
      royaltyWallets: [...formData.royaltyWallets, newWallet],
    });
  };
  const deleteInput = (wallet: string) => {
    const updatedArray = formData.royaltyWallets.filter(
      (item) => item !== wallet,
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
    if (royaltySum() > formData.spinPercent) {
      setFormDataErrors({
        ...formDataErrors,
        spinPercentError: true,
      });
    } else {
      setFormDataErrors({
        ...formDataErrors,
        spinPercentError: false,
      });
    }
  };

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
        <h5>{` ${formData?.spinPercent} %`}</h5>
      </span>

      <input
        type="range"
        className="w-full  h-2 touch-pan-y accent-black"
        min={0}
        max={50}
        step={0.5}
        defaultValue={formData?.spinPercent}
        onChange={handleFormChange}
        name="spinPercent"
      />
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Spin Royalties</h5>
        <Switch
          labelFor="spinRoyaltiesEnabled"
          checked={formData.spinRoyaltiesEnabled}
          name="spinRoyaltiesEnabled"
          onChange={handleFormChange}
        />
      </span>

      {formData?.spinRoyaltiesEnabled && (
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
                spinPercentError && formData.royaltyWallets.at(-1) === wallet
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
                    onClick={() => deleteInput(wallet)}
                  >
                    <DeleteIcon />
                  </section>
                )
              }
            />
          ))}
          {spinPercentError && (
            <ErrorMessage errorText="The distribution is not correct. Please revise the total royalty fee or change the allocation. " />
          )}
          <Button
            title="Add Wallet"
            className=" w-1/2 bg-black text-white rounded-md mt-5 self-end "
            onClick={addInput}
          />
        </div>
      )}
    </section>
  );
};

export default RoyaltiesSection;
