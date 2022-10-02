import React, { FC } from 'react';
import CrossIcon from '../../public/svg/CrossIcon';
import EyeIcon from '../../public/svg/EyeIcon';

interface FileInformationProps {
  fileName: string;
  fileType: string;
  fileSize: string;
  number: string;
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
  return (
    <div className="flex items-center gap-x-2">
      <p className="text-sm font-bold ">{number}</p>
      <div className="flex shadow-lg items-center justify-between border p-2 rounded-md basis-full">
        <p className="text-sm font-bold basis-1/3 truncate">{fileName}</p>
        <p className="text-sm font-bold basis-1/3 text-center ">{fileType}</p>
        <div className="flex gap-x-2 items-center">
          <EyeIcon onClick={viewIconClick} />
          <CrossIcon onClick={crossIconClick} />
          <p className="text-xs px-1 py-0.5 border rounded-sm">{fileSize}</p>
        </div>
      </div>
    </div>
  );
};

export default FileInformation;
