import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { HederaLogo } from '../../public/svg/HederaLogo';
import Button from '../Button';

const Header: FC = function () {
  const router = useRouter();
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
        onClick={() => router.push('/help')}
      />
    </header>
  );
};
export default Header;
