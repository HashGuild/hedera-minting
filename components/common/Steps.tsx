import React, { FC } from 'react';
import classNames from '../../utils/classNames';

interface StepsProps {
  steps: number[];
  currentStepIndex: number;
}
const Steps: FC<StepsProps> = function ({ currentStepIndex, steps }) {
  const dividerSpan = function (step: number) {
    if (currentStepIndex === step) {
      return (
        <span className=" h-1.5 w-8 md:w-12 rounded-lg last:hidden bg-split-black-white" />
      );
    }
    return (
      <span
        className={classNames(
          ' h-1.5 w-8 md:w-12 rounded-lg last:hidden',
          currentStepIndex > step ? 'bg-black' : 'bg-gray-200',
        )}
      />
    );
  };

  return (
    <nav className=" flex items-center md:flex-row gap-y-1 justify-between text-sm whitespace-nowrap px-3">
      {steps?.map((step) => (
        <>
          <span
            key={step}
            className={classNames(
              'my-2 md:mt-0 rounded-full h-8 w-8 flex items-center justify-center border',
              currentStepIndex === step || currentStepIndex > step
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black',
            )}
          >
            {step}
          </span>
          {dividerSpan(step)}
        </>
      ))}
    </nav>
  );
};
export default Steps;
