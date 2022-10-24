import React, { InputHTMLAttributes, useState } from 'react';
import classNames from '../../utils/classNames';
import ErrorMessage from './ErrorMessage';
import Tooltip from './Tooltip';
import AssistantModal from './AssistantModal';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  labelStyle?: string;
  containerStyles?: string;
  toolTipContent?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputContainerStyles?: string;
  error: boolean;
  errorMessage: string;
  helpModalHeader?: string;
  helpModalText?: string; 
  helpModalImgSrc?: string;
}

const TextArea = function ({
  labelText = '',
  labelStyle = '',
  containerStyles = '',
  toolTipContent = '',
  inputContainerStyles = '',
  iconLeft,
  iconRight,
  error,
  errorMessage,
  helpModalHeader,
  helpModalText,
  helpModalImgSrc,
  ...props
}: TextAreaProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div className={classNames('flex flex-col', containerStyles)}>
      <p className={classNames('text-sm', labelStyle)}>{labelText}</p>
      <div className="flex items-center">
        <div
          className={classNames(
            'flex  items-center justify-center shadow-sm border w-full rounded-md px-2',
            focus ? inputContainerStyles : '',
          )}
        >
          {iconLeft && <div className="mr-1 ">{iconLeft}</div>}
          <textarea onFocus={() => setFocus(true)} {...props} />
          {toolTipContent && (
            <Tooltip iconStyle="stroke-gray-400">{toolTipContent}</Tooltip>
          )}
          {
            helpModalHeader &&
           helpModalText && 
            helpModalImgSrc && 
            (<AssistantModal contentHeader={helpModalHeader} contentText={helpModalText} contentImgSrc={helpModalImgSrc} />)}
        </div>
        {iconRight && <div className="mx-2 ">{iconRight}</div>}
      </div>
      {focus && error && <ErrorMessage errorText={errorMessage} />}
    </div>
  );
};

export default TextArea;
