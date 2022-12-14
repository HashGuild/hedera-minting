import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/global/Button';
import classNames from '../utils/classNames';
import { indexFlow } from '../utils/Constants';
import { Flow } from '../utils/Interfaces';

const Home: NextPage = function () {
  const router = useRouter();
  const [currentFlowChoice, setCurrentFlowChoice] = useState<Flow>();

  const navigateToPage = () => {
    router.push(currentFlowChoice!.href);
  };

  return (
    <div>
      <p className="text-3xl font-semibold">Welcome Creator!</p>

      <p className="text-md mt-3 mb-11">
        Thank you for choosing HashGuild! We will guide you through the minting
        process. 
        <br />To get started, select one of the options below!
      </p>
      <p className="text-md font-bold mb-9">What would you like to create?</p>
      <div className="flex w-[1/2] justify-start gap-4 sm:gap-16 aspect-auto">
        {indexFlow.map((flowItem: Flow) => (
          <div
            aria-hidden="true"
            onClick={() => setCurrentFlowChoice(flowItem)}
            key={flowItem.index}
            className={classNames(
              'p-10 border shadow-xl select-none rounded-lg w-full flex flex-col items-center',
              currentFlowChoice?.index === flowItem.index
                ? 'bg-slate-900 dark:bg-white'
                : 'border-2',
            )}
          >
            <flowItem.icon
              className={`h-20 w-20 md:h-32 md:w-32 z-10 ${
                currentFlowChoice?.index === flowItem.index
                  ? 'fill-white dark:fill-black'
                  : 'fill-black dark:fill-white'
              }`}
            />
            <span
              className={`${
                currentFlowChoice?.index === flowItem.index
                  ? 'text-white dark:text-black'
                  : 'text-black dark:text-white'
              }  font-semibold`}
            >
              {flowItem.name}
            </span>
          </div>
        ))}
      </div>
      <Button
        disabled={!currentFlowChoice}
        onClick={navigateToPage}
        title="Continue"
        className="text-white bg-black dark:text-black dark:bg-white disabled:bg-black/50 dark:disabled:bg-white/50 hover:bg-black/80 dark:hover:bg-white/80 w-full rounded-md mt-20"
      />
    </div>
  );
};

export default Home;
