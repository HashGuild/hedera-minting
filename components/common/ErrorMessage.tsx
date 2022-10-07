import React from 'react';

interface ErrorMessageProps {
  errorText: string;
}

const ErrorMessage = function ({ errorText }: ErrorMessageProps) {
  return <span className="text-red-400 text-xxs my-1">{errorText}</span>;
};

export default ErrorMessage;
