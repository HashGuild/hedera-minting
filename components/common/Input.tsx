import React, { InputHTMLAttributes } from 'react';
import classNames from '../../utils/classNames';
import Tooltip from './Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelStyle?: string;
  containerStyles?: string;
  toolTipContent?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

const Input = function ({
  labelText,
  labelStyle = '',
  containerStyles = '',
  toolTipContent,
  iconLeft,
  ...props
}: InputProps) {
  return (
    <div className={containerStyles}>
      <p className={classNames('text-sm', labelStyle)}>{labelText}</p>
      <div className="flex items-center justify-around shadow-sm border rounded-md px-2">
        {iconLeft && <div className="mr-1 ">{iconLeft}</div>}
        <input {...props} />
        {toolTipContent && (
          <Tooltip iconStyle=" stroke-gray-400">{toolTipContent}</Tooltip>
        )}
      </div>
    </div>
  );
};

export default Input;
