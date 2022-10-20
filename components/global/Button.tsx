import React, { FC, MouseEventHandler } from 'react';
import classNames from '../../utils/classNames';

interface ButtonProps {
  className: string;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  buttonHeight?: number;
}

const Button: FC<ButtonProps> = function ({
  title,
  className,
  onClick,
  disabled = false,
  buttonHeight = 14
}) {
  return (
    <button
      type="button"
      className={classNames(`text-center hover:bg-opacity-80 px-4 p-2 h-${buttonHeight}`, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
