import React, { FC, useState } from 'react';
import Modal from './Modal';
import TooltipSvg from '../../public/svg/TooltipSvg';
import classNames from '../../utils/classNames';

interface AssitantModalProps {
  contentHeader: string;
  contentText: string;
  contentImgSrc: string;
  onOpen?: (prams?: any) => void;
  onClose?: (prams?: any) => void;
}

const AssistantModal: FC<AssitantModalProps> = function ({
  contentHeader,
  contentText,
  contentImgSrc,
  onOpen = () => {},
  onClose = () => {},
}: AssitantModalProps) {
  const [showAssistantModal, setShowAssistantModal] = useState(false);

  const closeTooltip = () => {
    setShowAssistantModal(false);
    onClose();
  };

  const openTooltip = () => {
    setShowAssistantModal(true);
    onOpen();
  };

  const toggleAssistanceModal = () => {
    if (showAssistantModal) {
      closeTooltip();
    } else {
      openTooltip();
    }
  };

  return (

    <span
    role="presentation"
    className={classNames('inline-block  relative cursor-pointer')}
    onClick={toggleAssistanceModal}
  >
   
      <TooltipSvg className="stroke-gray-400" />
  
    {showAssistantModal && (
        <Modal showModal={showAssistantModal} setShowModal={setShowAssistantModal}>
        <h3 className="my-2">{contentHeader}</h3>
  
        <section className="mb-16 flex flex-col gap-3">
          <p className="text-gray-500">{contentText}</p>
        </section>
  
        <picture>
          <source src={contentImgSrc} />
          <img
            src={contentImgSrc}
            alt="overlay"
            className="rounded-md w-full h-1/2 mb-8"
            onClick={() => window.open(contentImgSrc, "_blank")}
          />
        </picture>
      </Modal>

    )
    }
  </span>

  );
};

export default AssistantModal;
