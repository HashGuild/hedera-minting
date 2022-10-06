import React, { ChangeEvent } from 'react';
import { NftForm } from '../../utils/Interfaces';
import Input from '../common/Input';
import Switch from '../common/Switch';
import Button from '../global/Button';

interface RoyaltiesSectionProps {
  formData: NftForm;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RoyaltiesSection = function ({
  formData,
  handleFormChange,
}: RoyaltiesSectionProps) {
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
        <>
          {formData?.royaltyWallets.map((wallet, index: number) => (
            <Input
              key={index.toFixed(1)}
              toolTipContent={<h3 className="p-2 bg-white">lorem ipsum</h3>}
              containerStyles="mt-4"
              labelText={`Royalty Wallet ${index + 1}`}
              labelStyle="mb-2.5"
              type="text"
              name="creatorName"
              placeholder="20%"
              className=" w-full  text-black placeholder:text-xs placeholder:text-gray-400 py-1.5   "
            />
          ))}
          <Button
            title="Add Wallet"
            className=" w-1/2 bg-black text-white rounded-md mt-5 self-end "
            onClick={() => console.log('first')}
          />
        </>
      )}
    </section>
  );
};

export default RoyaltiesSection;
