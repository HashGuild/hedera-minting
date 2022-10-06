import React, { InputHTMLAttributes } from 'react';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  labelFor: string;
}
const Switch = function ({ labelFor, ...props }: SwitchProps) {
  return (
    <label
      htmlFor={labelFor}
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id={labelFor}
        className="sr-only peer"
        {...props}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-black dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black" />
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
    </label>
  );
};

export default Switch;
