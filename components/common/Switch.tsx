import React, { InputHTMLAttributes } from 'react';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  switchValue: boolean;
  switchOnChange: () => void;
}

const Switch = function ({
  switchValue,
  switchOnChange,
  ...props
}: SwitchProps) {
  return (
    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        checked={switchValue}
        id="default-toggle"
        className="sr-only peer"
        onChange={switchOnChange}
        {...props}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black" />
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
    </label>
  );
};

export default Switch;
