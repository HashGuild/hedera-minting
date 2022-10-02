import React, { FC, useState } from 'react';
import TooltipSvg from '../../public/svg/TooltipSvg';
import { classNames } from '../../public/utils/classNames';

interface TooltipProps {
  className?: string;
  children: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = function ({ className = '', children }) {
  const [showText, setShowText] = useState(false);
  return (
    <span className={classNames('inline-block  relative ', className)}>
      <TooltipSvg onClick={() => setShowText(!showText)} />

      {showText && (
        <div className=" absolute  border h-fit  shadow-md mt-2 right-0 z-10 rounded-md overflow-hidden ">
          {children}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
