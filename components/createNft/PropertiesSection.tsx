import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import DeleteIcon from '../../public/svg/DeleteIcon';
import {
  NftForm,
  NftFormErrors,
  NftInCollection,
  NftProperty,
  StepTwoErrors,
} from '../../utils/Interfaces';
import Input from '../common/Input';
import Switch from '../common/Switch';
import Button from '../global/Button';

interface PropertiesSectionProps {
  formData: NftForm | NftInCollection;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<NftForm | NftInCollection>>;
  formDataErrors: NftFormErrors | StepTwoErrors;
  setFormDataErrors: Dispatch<SetStateAction<NftFormErrors | StepTwoErrors>>;
}

const PropertiesSection = function ({
  formData,
  handleFormChange,
  setFormData,
  formDataErrors,
  setFormDataErrors,
}: PropertiesSectionProps) {
  const addProperty = () => {
    const newProperty: NftProperty = { key: '', value: '' };
    setFormData({
      ...formData,
      nftProperties: [...formData.nftProperties, { ...newProperty }],
    });
  };
  const deleteInput = (propertyIndex: number) => {
    const updatedArray = formData.nftProperties.filter(
      (_, index) => index !== propertyIndex,
    );
    setFormData({
      ...formData,
      nftProperties: updatedArray,
    });
  };
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newArr = formData.nftProperties;
    if (e.target.name === 'key') {
      if (e.target.value.length === 0) {
        setFormDataErrors({ ...formDataErrors, nftPropertiesError: true });
      } else {
        setFormDataErrors({ ...formDataErrors, nftPropertiesError: false });
      }
      newArr[index].key = e.target.value;
    } else if (e.target.name === 'value') {
      if (e.target.value.length === 0) {
        setFormDataErrors({ ...formDataErrors, nftPropertiesError: true });
      } else {
        setFormDataErrors({ ...formDataErrors, nftPropertiesError: false });
      }
      newArr[index].value = e.target.value;
    }
    setFormData({ ...formData, nftProperties: newArr });
  };

  useEffect(() => {
    function resetProperties() {
      if (!formData.nftPropertiesEnabled) {
        setFormData((prev) => ({
          ...prev,
          nftProperties: [{ key: '', value: '' }],
        }));
        setFormDataErrors((errors) => ({
          ...errors,
          [`nftPropertiesError`]: false,
        }));
      } else {
        setFormDataErrors((errors) => ({
          ...errors,
          [`nftPropertiesError`]: true,
        }));
      }
    }
    resetProperties();
  }, [formData.nftPropertiesEnabled, setFormData, setFormDataErrors]);

  return (
    <section className="my-10 flex flex-col">
      <h4 className="text-lg font-bold">Attributes</h4>
      <p className="text-sm mt-3">
      NFTs can contain specific attributes which can determine rarity or provide additional information about the NFT.
      </p>
      <span className="flex items-center justify-between text-sm font-bold my-6">
        <h5>Add Custom Attributes</h5>
        <Switch
          labelFor="nftPropertiesEnabled"
          checked={formData.nftPropertiesEnabled}
          name="nftPropertiesEnabled"
          onChange={handleFormChange}
        />
      </span>

      {formData?.nftPropertiesEnabled && (
        <>
          {formData?.nftProperties.map((property, index: number) => (
            <div className="flex gap-2" key={index.toFixed(1)}>
              <Input
                containerStyles="mt-4 basis-1/4"
                required
                labelText={index === 0 ? 'Trait Type' : ''}
                labelStyle="my-2.5"
                type="text"
                value={property.key}
                name="key"
                inputContainerStyles={
                  property.key.length === 0 && formDataErrors.nftPropertiesError
                    ? 'border-red-400'
                    : ''
                }
                errorMessage=""
                error={formDataErrors.nftPropertiesError}
                placeholder="Key"
                className="w-full text-black placeholder:text-sm placeholder:text-gray-400 py-1.5   "
                onChange={(e) => {
                  handleChange(index, e);
                }}
              />
              <Input
                containerStyles="mt-4 basis-3/4"
                labelText={index === 0 ? 'Description' : ''}
                labelStyle="my-2.5"
                type="text"
                required
                value={property.value}
                inputContainerStyles={
                  property.value.length === 0 &&
                  formDataErrors.nftPropertiesError
                    ? 'border-red-400'
                    : ''
                }
                name="value"
                errorMessage=""
                error={formDataErrors.nftPropertiesError}
                placeholder="Value"
                className=" w-full  text-black placeholder:text-sm placeholder:text-gray-400 py-1.5   "
                onChange={(e) => {
                  handleChange(index, e);
                }}
                iconRight={
                  index > 0 && (
                    <section
                      role="presentation"
                      className="p-2  h-6 w-6 flex items-center bg-gray-300 rounded-full hover:bg-gray-300/80 cursor-pointer"
                      onClick={() => deleteInput(index)}
                    >
                      <DeleteIcon />
                    </section>
                  )
                }
              />
            </div>
          ))}
          <Button
            title="Add Attributes"
            className=" w-1/2 bg-black text-white rounded-md mt-5 self-end"
            onClick={addProperty}
            buttonHeight={10}
          />
        </>
      )}
    </section>
  );
};

export default PropertiesSection;
