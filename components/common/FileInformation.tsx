import React, { FC, useState } from 'react';
import CrossIcon from '../../public/svg/CrossIcon';
import EyeIcon from '../../public/svg/EyeIcon';
import Tooltip from './Tooltip';

interface FileInformationProps {
  fileName: string;
  fileType: string;
  fileSize: string;
  number: number;
  crossIconClick: () => void;
  viewIconClick: () => void;
}

const FileInformation: FC<FileInformationProps> = function ({
  fileName,
  fileType,
  fileSize,
  number = 1,
  crossIconClick,
  viewIconClick,
}) {
  const [showContent, setShowContent] = useState(false);
  return (
    <div className="flex items-center shadow-lg">
      <p className="text-sm font-bold w-3 ">{`${number + 1}.`}</p>
      <div className="flex items-center justify-between p-2 rounded-md min-w-full">
        <p className="text-sm font-bold w-1/3  truncate">{fileName}</p>
        <p className="text-sm font-bold text-center  ">{fileType}</p>
        <div className="flex gap-x-2 items-center">
          <Tooltip
            onOpen={() => setShowContent(true)}
            onClose={() => setShowContent(false)}
            showContent={showContent}
            TooltipIcon={
              <CrossIcon className="cursor-pointer hover:opacity-80 stroke-transparent " />
            }
          >
            <section className="text-xs whitespace-nowrap bg-white">
              <p className="pb-1 border-b p-3 border-black font-semibold">
                Are you sure?
              </p>
              <div className="p-3 space-y-3">
                <p
                  role="presentation"
                  className="font-semibold text-red-600 cursor-pointer"
                  onClick={crossIconClick}
                >
                  Delete File
                </p>
                <p
                  role="presentation"
                  className="font-semibold cursor-pointer"
                  onClick={() => setShowContent(false)}
                >
                  Abort
                </p>
              </div>
            </section>
          </Tooltip>
          <EyeIcon
            onClick={viewIconClick}
            className="cursor-pointer  hover:opacity-80"
          />
          <p className="text-xxs md:text-xs px-1 py-0.5 w-20 text-center border rounded-sm">
            {fileSize}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileInformation;
