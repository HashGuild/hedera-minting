import React, { FC } from "react";
import { CheckSolid } from "../../public/svg/CheckSolid";
import { classNames } from "../../public/utils/classNames";
import { Step } from "../../utils/Interfaces";

interface StepsProps {
  steps: Step[];
  currentStepIndex: number;
  maxSteps: number;
}
export const Steps: FC<StepsProps> = function ({
  currentStepIndex,
  steps,
  maxSteps,
}) {
  return (
    <nav className="flex items-center flex-col md:flex-row gap-y-1 justify-between py-5 border-b border-accentGrey text-sm whitespace-nowrap ">
      {steps?.map((step) => (
        <div key={step.index}>
          <div
            className={classNames(
              "flex items-center  justify-center ",
              currentStepIndex == step.index ? "text-black" : "text-gray-400"
            )}
          >
            {currentStepIndex > step.index && (
              <CheckSolid className=" min-h-3 min-w-3 h-3 w-3 md:min-h-5 md:min-w-5 md:h-5 md:w-5 mr-1 md:mr-2 " />
            )}

            <span>{step.name}</span>
          </div>
          {step.index != maxSteps && (
            <span className="bg-gray-300 mx-1 h-[1px] w-full hidden md:flex" />
          )}
        </div>
      ))}
    </nav>
  );
};
