import React, { Dispatch, FC, SetStateAction } from 'react';
import CrossIcon from '../../public/svg/CrossIcon';

interface ModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onClose?: (prams?: any) => void;
}

const Modal: FC<ModalProps> = function ({
  children,
  showModal,
  setShowModal,
  onClose = () => {},
}) {
  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div>
      {showModal && (
        <div className="inset-0 absolute flex-col items-center bg-gray-900/50  z-10 min-w-full px-[5%] md:px-[15%] pt-10 md:pt-40 min-h-[300vh]">
          <div>
            <CrossIcon
              className=" mb-2 h-10 w-10 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className="bg-white w-full p-8 h-screen rounded-md">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
