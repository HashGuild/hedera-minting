import React, { FC, useState } from 'react';
import TooltipSvg from '../../public/svg/TooltipSvg';
import classNames from '../../utils/classNames';

interface TooltipProps {
  className?: string;
  iconStyle?: string;
  showContent?: boolean;
  children: React.ReactNode;
  TooltipIcon?: React.ReactNode;
  onOpen?: (prams?: any) => void;
  onClose?: (prams?: any) => void;
  right?: boolean;
}

const Tooltip: FC<TooltipProps> = function ({
  className = '',
  iconStyle = 'stroke-black',
  children,
  TooltipIcon,
  onOpen = () => {},
  onClose = () => {},
  showContent = true,
  right = true,
}) {
  const [showText, setShowText] = useState(false);

  const closeTooltip = () => {
    setShowText(false);
    onClose();
  };

  const openTooltip = () => {
    setShowText(true);
    onOpen();
  };
  const toggleTooltip = () => {
    if (showText) {
      closeTooltip();
    } else {
      openTooltip();
    }
  };

  return (
    <span
      role="presentation"
      className={classNames('inline-block  relative cursor-pointer', className)}
      onClick={toggleTooltip}
    >
      {TooltipIcon ? (
        <div className={iconStyle}>{TooltipIcon}</div>
      ) : (
        <TooltipSvg className={iconStyle} />
      )}
      {showText && showContent && (
        <div
          className={classNames(
            ' absolute  border h-fit  shadow-md mt-[1px] z-20 rounded-md overflow-hidden ',
            right ? ' right-0 ' : 'left-0',
          )}
        >
          {children}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
