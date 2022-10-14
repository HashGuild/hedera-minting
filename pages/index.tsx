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

      <p className="text-3xl font-bold ">Welcome Creator!</p>

      <p className="text-sm mt-3 mb-11 ">
        Thank you for choosing HashGuild! We will guide you through the
        minting process. To get started, select one of the options below!
      </p>
      <p className="text-sm font-bold  mb-9">
        What would you like to create?
      </p>
      <div className="flex w-full justify-between md:justify-start md:gap-16">
        {indexFlow.map((flowItem: Flow) => (
          <div
            aria-hidden="true"
            onClick={() => setCurrentFlowChoice(flowItem)}
            key={flowItem.index}
            className={classNames(
              'p-10 border shadow-xl select-none',
              currentFlowChoice?.index === flowItem.index
                ? 'border-slate-900 '
                : 'border-2',
            )}
          >
            <flowItem.icon className="h-20 w-20 z-10 fill-black" />
            <span>{flowItem.name}</span>
          </div>
        ))}
      </div>
      <Button
        disabled={!currentFlowChoice}
        onClick={navigateToPage}
        title="Continue"
        className="w-full text-white bg-black rounded-md mt-20 disabled:bg-black/50"
      />
    </div>
  );
};

export default Home;
