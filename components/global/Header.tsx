import Link from 'next/link';
import React, { FC, useState } from 'react';
import HashGuildLogo from '../../public/svg/HashGuildLogo';
import Button from './Button';
import HelpModal from './HelpModal';
import ToggleTheme from './SwitchTheme';

const Header: FC = function () {
  const [openHelp, setOpenHelp] = useState(false);
  
  return (
    <header className="flex items-center justify-between py-5 md:border-b md:border-accentGrey px-[5%] ">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <HashGuildLogo className="h-8 w-8 fill-gray-700 dark:stroke-white" />
          <h1 className="font-bold text-gray-700 inline-block dark:text-white">
          HashGuild Minting
          </h1>
        </div>
      </Link>
      <div className='flex flex-row gap-4'>
      <ToggleTheme />
      <Button
        title="Help"
        className="border border-black dark:border-white rounded-md hover:bg-black hover:text-white hover:cursor-pointer dark:hover:bg-white dark:hover:border-black dark:hover:text-black"
        onClick={() => setOpenHelp(true)}
        buttonHeight={10}
      />
      </div>
      {openHelp && (
        <HelpModal openHelp={openHelp} setOpenHelp={setOpenHelp} />
      )}
    </header>
  );
};
export default Header;
