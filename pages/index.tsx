import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/Button';
import { classNames } from '../public/utils/classNames';
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
      <div className="flex flex-col items-center justify-center">
        <div className="md:mt-6 md:border md:shadow-md px-0 md:px-32 max-w-5xl ">
          <div className="flex flex-col py-12 max-w-screen-md ">
            <p className="text-3xl font-bold ">Welcome Creator!</p>

            <p className="text-sm font-bold mt-11 ">
              What would you like to create?
            </p>
            <p className="text-sm mt-2 mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              semper nisi quis dolor tincidunt, a venenatis libero bibendum
            </p>
            <div className="flex w-full justify-between md:justify-start md:gap-16">
              {indexFlow.map((flowItem) => (
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
        </div>
      </div>
    </div>
  );
};

export default Home;
