import React, {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import CrossIcon from '../../public/svg/CrossIcon';
import UploadFile from '../../public/svg/UploadFile';
import classNames from '../../utils/classNames';
import formatBytes from '../../utils/formatBytes';
import getFileName from '../../utils/getFileName';
import getFileType from '../../utils/getFileType';
import { NftForm } from '../../utils/Interfaces';
import FileInformation from '../common/FileInformation';
import Tooltip from '../common/Tooltip';
import Button from '../global/Button';

interface FileUploadSectionProps {
  formData: NftForm;
  setFormData: Dispatch<SetStateAction<NftForm>>;
}

const FileUploadSection = function ({
  formData,
  setFormData,
}: FileUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [viewImage, setViewImage] = useState(false);
  const [overlayImageSrc, setOverlayImageSrc] = useState('');

  const handleDrag = function (e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = function (e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const { files } = e.dataTransfer;
    if (files && files[0]) {
      const filesArray = Array.from(files);

      const uploaded = [...formData.nftFiles, ...filesArray];

      setFormData({ ...formData, nftFiles: uploaded });
    }
  };
  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { files } = e.target;
    if (files && files[0]) {
      const filesArray = Array.from(files);
      const uploaded = [...formData.nftFiles, ...filesArray];

      setFormData({ ...formData, nftFiles: uploaded });
    }
  };
  const onButtonClick = () => {
    inputFileRef?.current?.click();
  };

  const deleteFile = (file: File) => {
    const newFiles = new DataTransfer();
    const filteredNftFiles = formData.nftFiles.filter(
      (item: File) => item.name !== file.name,
    );
    if (inputFileRef.current !== null) {
      const files = inputFileRef?.current?.files!;
      for (let i = 0; i < files.length; i++) {
        const storedFile = files[i];
        if (file.name !== storedFile.name) newFiles.items.add(file); // here you exclude the file. thus removing it.
      }
      inputFileRef.current.files = newFiles.files;
    }

    setFormData({ ...formData, nftFiles: filteredNftFiles });
  };
  const viewFile = (file: File) => {
    setViewImage(true);
    setOverlayImageSrc(URL.createObjectURL(file));
  };
  const closeOverlay = () => {
    setOverlayImageSrc('');
    setViewImage(false);
  };
  return (
    <>
      <h4 className="text-lg mb-6 mt-8 font-bold">Upload Files</h4>
      {viewImage && (
        <div className="inset-0 flex flex-col items-center bg-gray-900/50 fixed z-10 min-w-full px-[5%] md:px-[15%] pt-20 md:pt-40 min-h-screen">
          <div>
            <CrossIcon className=" mb-2 h-10 w-10" onClick={closeOverlay} />
            <picture>
              <source src={overlayImageSrc} />
              <img
                src={overlayImageSrc}
                alt="overlay"
                className="rounded-md max-h-96 md:max-h-[60rem] md:h-full"
              />
            </picture>
          </div>
        </div>
      )}

      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        htmlFor="input-file-upload"
        className={classNames(
          'h-72 px-20 border-black border-dashed w-full rounded-xl border-2 flex flex-col cursor-pointer items-center justify-center',
          dragActive ? 'bg-black/20' : '',
        )}
      >
        <input
          ref={inputFileRef}
          accept="image/jpeg, image/png, image/gif, video/mp4, video/quicktime, model/gltf-binary            "
          type="file"
          id="input-file-upload"
          multiple
          className="hidden"
          onChange={handleChange}
        />

        <UploadFile />
        <p className="my-5 text-sm text-center text-gray-400">
          Click to browse or
          <br />
          drag and drop your files.
        </p>
        <Button
          title="Add Files"
          className="bg-black text-white w-full"
          onClick={onButtonClick}
        />
      </label>
      <ul className="text-sm mt-6 list-disc px-[5%] ">
        <li>Up to 2 files and 100mb in total size</li>
        <li>
          <div>
            <span> Support of image, video and 3D files</span>
            <Tooltip className="ml-5">
              <section className="text-xs whitespace-nowrap bg-white">
                <p className="pb-1 border-b p-3 border-black font-semibold">
                  File Types
                </p>
                <ul className="p-3 space-y-3">
                  <li>
                    <div>
                      <p className="font-semibold">Images</p>
                      <p className="text-gray-400">JPEG / PNG / GIF</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p className="font-semibold">Videos</p>
                      <p className="text-gray-400">MP4 / MOV</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p className="font-semibold">3D</p>
                      <p className="text-gray-400">GLB</p>
                    </div>
                  </li>
                </ul>
              </section>
            </Tooltip>
          </div>
        </li>
      </ul>
      <section className="my-8 space-y-2 text-sm">
        <h4 className="font-bold ">Your Files</h4>
        <p>
          The files will be minted in your NFT. The order of the files will be
          displayed by the order of the NFTs on your files. The NFT can include
          up to 2 files, including the thumbnail.
        </p>
      </section>

      <section className=" space-y-3 text-sm mb-14 max-w-full ">
        <p className="font-bold">Thumbnail</p>
        <p>The thumbnail needs to be an image.</p>

        {formData?.nftFiles?.map((file: File, index: number) => (
          <FileInformation
            key={file.size}
            number={index}
            fileName={getFileName(file)}
            fileSize={formatBytes(file.size)}
            fileType={getFileType(file)}
            crossIconClick={() => deleteFile(file)}
            viewIconClick={() => viewFile(file)}
          />
        ))}
      </section>
      <hr />
    </>
  );
};

export default FileUploadSection;
