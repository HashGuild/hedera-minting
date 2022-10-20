import React, { FC, useState } from 'react';
import HashGuildLogo from '../../public/svg/HashGuildLogo';
import HelpModal from './HelpModal';

const Footer: FC = function () {
  const [openHelp, setOpenHelp] = useState(false);

  return (
    <footer className="flex flex-col lg:flex-row justify-between lg:items-center py-5 md:border-b md:border-accentGrey px-[5%] dark:text-white ">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-24">
        <div className="pb-4 lg:pb-0 flex items-center gap-2">
          <HashGuildLogo className="h-6 w-6 fill-gray-700 dark:stroke-white" />
          <h1 className="font-bold text-gray-700 inline-block dark:text-white">
            HashGuild Minting
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-8 pb-4 lg:pb-0">
          <div className="flex gap-8 pb-4 lg:pb-0 font-semibold text-base">
            <a
              href="https://hashguild.xyz/information"
              target="_blank"
              rel="noreferrer"
            >
              About HashGuild
            </a>
            <a href="https://hedera.com/nft" target="_blank" rel="noreferrer">
              Why Hedera
            </a>
            <span className="cursor-pointer" onClick={() => setOpenHelp(true)} role="button" tabIndex={0} onKeyDown={() => setOpenHelp(true)}>
              Support
            </span>
            {openHelp && (
              <HelpModal openHelp={openHelp} setOpenHelp={setOpenHelp} />
            )}
          </div>
          <div className="flex gap-8">
            <a
              href="https://discord.gg/TEyQkbMwaw"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12Z"
                  fill="#606265"
                />
                <path
                  d="M17.198 6.995c-.956-.46-1.981-.8-3.053-.994a.046.046 0 0 0-.05.024 9.235 9.235 0 0 0-.38.82 10.886 10.886 0 0 0-3.428 0 8.472 8.472 0 0 0-.387-.82.047.047 0 0 0-.049-.024 11.915 11.915 0 0 0-3.053.994.044.044 0 0 0-.02.018c-1.945 3.05-2.477 6.023-2.216 8.96a.055.055 0 0 0 .02.038 12.22 12.22 0 0 0 3.745 1.987c.02.006.04-.001.053-.018a9.42 9.42 0 0 0 .766-1.308.05.05 0 0 0-.026-.07 8.033 8.033 0 0 1-1.17-.585.052.052 0 0 1-.005-.084 6.49 6.49 0 0 0 .232-.191.045.045 0 0 1 .049-.007c2.455 1.176 5.112 1.176 7.538 0a.045.045 0 0 1 .05.006c.075.065.153.13.232.192a.052.052 0 0 1-.004.084c-.373.23-.762.423-1.17.585a.051.051 0 0 0-.026.07c.225.457.483.893.766 1.307a.046.046 0 0 0 .052.019 12.179 12.179 0 0 0 3.752-1.987.051.051 0 0 0 .02-.037c.312-3.396-.524-6.345-2.218-8.96a.039.039 0 0 0-.02-.02Zm-7.685 7.19c-.74 0-1.349-.712-1.349-1.587 0-.874.598-1.586 1.349-1.586.756 0 1.36.718 1.348 1.586 0 .875-.598 1.587-1.348 1.587Zm4.984 0c-.74 0-1.348-.712-1.348-1.587 0-.874.597-1.586 1.348-1.586.757 0 1.36.718 1.348 1.586 0 .875-.591 1.587-1.348 1.587Z"
                  fill="#F4F5F5"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/hashguild"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12Z"
                  fill="#606265"
                />
                <path
                  d="M18 8.25c-.45.225-.9.3-1.425.375.525-.3.9-.75 1.05-1.35-.45.3-.975.45-1.575.6a2.619 2.619 0 0 0-1.8-.75c-1.575 0-2.775 1.5-2.4 3-2.025-.075-3.825-1.05-5.1-2.55-.675 1.125-.3 2.55.75 3.3-.375 0-.75-.15-1.125-.3 0 1.125.825 2.175 1.95 2.475-.375.075-.75.15-1.125.075a2.43 2.43 0 0 0 2.325 1.725c-.9.675-2.25 1.05-3.525.9 1.125.675 2.4 1.125 3.75 1.125 4.575 0 7.125-3.825 6.975-7.35.525-.3.975-.75 1.275-1.275Z"
                  fill="#F4F5F5"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-8 lg:justify-between lg:items-center">
        <div className="text-xs text-gray-500  pb-2 lg:pb-0">© 2022</div>
        <div className="flex gap-8 text-xs  font-medium underline">
          <a href="https://hashguild.xyz/tos" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
          <a
            href="https://hashguild.xyz/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
