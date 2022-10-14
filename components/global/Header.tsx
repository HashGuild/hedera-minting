import Link from 'next/link';
import React, { FC, useState } from 'react';
import { HederaLogo } from '../../public/svg/HederaLogo';
import { helpButtons } from '../../utils/Constants';
import Modal from '../common/Modal';
import Button from './Button';

const Header: FC = function () {
  const [openHelp, setOpenHelp] = useState(false);
  const helpButtonListStyles =
    'py-2.5 w-full rounded-lg border cursor-pointer hover:bg-slate-200';
  return (
    <header className="flex items-center justify-between py-5 md:border-b md:border-accentGrey px-[5%] ">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <HederaLogo className="h-8 w-8 fill-gray-700 dark:fill-white" />
          <h1 className="font-bold text-gray-700 inline-block dark:text-white">
            Hedera
          </h1>
        </div>
      </Link>

      <Button
        title="Help"
        className="border border-black dark:border-white rounded-md text-xs hover:bg-black hover:text-white hover:cursor-pointer dark:hover:bg-white dark:hover:border-black dark:hover:text-black"
        onClick={() => setOpenHelp(true)}
      />
      {openHelp && (
        <Modal showModal={openHelp} setShowModal={setOpenHelp}>
          <h1 className="text-lg font-semibold text-center">
            How can we help you?
          </h1>
          <p className="mt-2 text-sm">
            Hedera Minting Engine is built and maintained by the HashGuild Team.
            You can either find links to documentational resources or to a
            contact option to the team here.
          </p>
          <p className="text-center my-4">____________</p>
          <div className="flex flex-col gap-y-4 text-md font-semibold">
            <p className="text-sm font-normal">Helpful Links</p>
            {helpButtons.map((button) => (
              <Button
                className={helpButtonListStyles}
                title={button.name}
                onClick={button.onClick}
              />
            ))}
          </div>
        </Modal>
      )}
    </header>
  );
};
export default Header;
