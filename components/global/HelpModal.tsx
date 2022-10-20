import React, { Dispatch, SetStateAction } from 'react';
import { helpButtons } from '../../utils/Constants';
import Modal from '../common/Modal';

interface HelpModalProps {
    openHelp: boolean;
    setOpenHelp: Dispatch<SetStateAction<any>>;
  }

const HelpModal = function ({openHelp, setOpenHelp} : HelpModalProps) {
 
  const helpButtonListStyles =
    'py-2.5 w-full rounded-lg border cursor-pointer hover:bg-slate-200 text-center';
  
    return (
        <Modal showModal={openHelp} setShowModal={setOpenHelp}>
          <h1 className="text-lg font-semibold text-center">
            How can we help you?
          </h1>
          <p className="mt-2 text-center font-normal">
            This minting engine is built and maintained by the HashGuild Team.
            You can either find links to documentational resources or to a
            contact option to the team here.
          </p>
          <div className='text-center my-4'>
          <p className="md:hidden ">____________</p>
          </div>
          <div className="flex flex-col gap-y-4 text-md font-semibold">
            <p className="text-sm font-normal">Helpful Links</p>
            {helpButtons.map((button) => (
              <a
                className={helpButtonListStyles}
                href={button.href}
                target="_blank"
                rel="noreferrer"
              >{button.name}
              </a>
            ))}
          </div>
        </Modal>   
  );
};

export default HelpModal;
