import React, { FC, useCallback, useEffect, useState } from 'react';
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
}

const Tooltip: FC<TooltipProps> = function ({
  className = '',
  iconStyle = 'stroke-black',
  children,
  TooltipIcon,
  onOpen = () => {},
  onClose = () => {},
  showContent = false,
}) {
  const [showText, setShowText] = useState(showContent);

  const closeTooltip = useCallback(() => {
    setShowText(false);
    onClose();
  }, [onClose]);

  const openTooltip = useCallback(() => {
    setShowText(true);
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (!showContent) closeTooltip();
  }, [showContent, closeTooltip]);

  return (
    <span
      className={classNames('inline-block  relative', className)}
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
    >
      {TooltipIcon ? (
        <div className={iconStyle}>{TooltipIcon}</div>
      ) : (
        <TooltipSvg className={iconStyle} />
      )}
      {showText && (
        <div className=" absolute  border h-fit  shadow-md mt-[1px] right-0 z-10 rounded-md overflow-hidden ">
          {children}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
