import React, { FC, useState } from 'react';
import TooltipSvg from '../../public/svg/TooltipSvg';
import classNames from '../../utils/classNames';

interface TooltipProps {
  className?: string;
  iconStyle?: string;
  children: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = function ({
  className = '',
  iconStyle = 'stroke-black',
  children,
}) {
  const [showText, setShowText] = useState(false);
  return (
    <span className={classNames('inline-block  relative ', className)}>
      <TooltipSvg
        className={iconStyle}
        onClick={() => setShowText(!showText)}
      />

      {showText && (
        <div className=" absolute  border h-fit  shadow-md mt-2 right-0 z-10 rounded-md overflow-hidden ">
          {children}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
