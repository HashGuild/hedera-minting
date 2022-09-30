import React, { FC } from 'react';
import { CheckSolid } from '../../public/svg/CheckSolid';
import { classNames } from '../../public/utils/classNames';
import { Step } from '../../utils/Interfaces';

interface StepsProps {
  steps: Step[];
  currentStepIndex: number;
}
const Steps: FC<StepsProps> = function ({ currentStepIndex, steps }) {
  return (
    <nav className=" flex items-center flex-col md:flex-row gap-y-1 justify-between py-5 border-b border-accentGrey text-sm whitespace-nowrap">
      {steps?.map((step) => (
        <>
          <div
            className={classNames(
              'flex items-center w-full justify-center my-2 md:mt-0 ',
              currentStepIndex === step.index ? 'text-black' : 'text-gray-400',
            )}
          >
            {currentStepIndex > step.index && (
              <CheckSolid className=" min-h-3 min-w-3 h-3 w-3 md:min-h-5 md:min-w-5 md:h-5 md:w-5 mr-1 md:mr-2 " />
            )}

            <span>{step.name}</span>
          </div>
          <span className="bg-gray-300 h-[1px] w-full  hidden md:flex last:hidden" />
        </>
      ))}
    </nav>
  );
};
export default Steps;
