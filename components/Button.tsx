import React, { FC, MouseEventHandler } from 'react';
import { classNames } from '../public/utils/classNames';

interface ButtonProps {
  className: string;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = function ({
  title,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={classNames('text-center px-4 p-2', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
