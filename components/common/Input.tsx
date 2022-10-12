import React, { InputHTMLAttributes } from 'react';
import classNames from '../../utils/classNames';
import Tooltip from './Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  labelStyle?: string;
  containerStyles?: string;
  toolTipContent?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputContainerStyles?: string;
}

const Input = function ({
  labelText = '',
  labelStyle = '',
  containerStyles = '',
  toolTipContent = '',
  inputContainerStyles = '',
  iconLeft,
  iconRight,
  ...props
}: InputProps) {
  return (
    <div className={classNames('flex flex-col', containerStyles)}>
      <p className={classNames('text-sm', labelStyle)}>{labelText}</p>
      <div className="flex items-center">
        <div
          className={classNames(
            'flex  items-center justify-center shadow-sm border w-full rounded-md px-2',
            inputContainerStyles,
          )}
        >
          {iconLeft && <div className="mr-1 ">{iconLeft}</div>}
          <input {...props} />
          {toolTipContent && (
            <Tooltip iconStyle="stroke-gray-400">{toolTipContent}</Tooltip>
          )}
        </div>
        {iconRight && <div className="mx-2 ">{iconRight}</div>}
      </div>
    </div>
  );
};

export default Input;
