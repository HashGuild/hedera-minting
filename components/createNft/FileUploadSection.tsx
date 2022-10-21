import React, {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import UploadFile from '../../public/svg/UploadFile';
import classNames from '../../utils/classNames';
import formatBytes from '../../utils/formatBytes';
import getFileName from '../../utils/getFileName';
import getFileType from '../../utils/getFileType';
import {
  NftForm,
  NftFormErrors,
  NftInCollection,
  StepTwoErrors,
} from '../../utils/Interfaces';
import ErrorMessage from '../common/ErrorMessage';
import FileInformation from '../common/FileInformation';
import Modal from '../common/Modal';
import Tooltip from '../common/Tooltip';
import Button from '../global/Button';

interface FileUploadSectionProps {
  formData: NftForm | NftInCollection;
  setFormData: Dispatch<SetStateAction<NftForm | NftInCollection>>;
  formDataErrors: NftFormErrors | StepTwoErrors;
  setFormDataErrors: Dispatch<SetStateAction<NftFormErrors | StepTwoErrors>>;
}

const FileUploadSection = function ({
  formData,
  setFormData,
  formDataErrors,
  setFormDataErrors,
}: FileUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputThumbnailRef = useRef<HTMLInputElement>(null);
  const [viewImage, setViewImage] = useState(false);
  const [overlayImageSrc, setOverlayImageSrc] = useState('');
  const [addThumbnail, setAddThumbnail] = useState(false);
  const [addNormalFiles, setAddNormalFiles] = useState(false);
  const [focus, setFocus] = useState(false);

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
      if (files.length > 1) {
        const filesArray = Array.from(files);

        const uploaded = [...formData.nftFiles, ...filesArray];

        setFormData({ ...formData, nftFiles: uploaded });
        setAddThumbnail(false);
        setAddNormalFiles(false);
      } else {
        setFormData({ ...formData, nftThumbnail: files[0] });
        setAddThumbnail(false);
        setAddNormalFiles(false);
      }
    }
  };

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFocus(true);
    const { files } = e.target;
    if (e.target.multiple) {
      if (files && files[0]) {
        const filesArray = Array.from(files);
        const uploaded = [...formData.nftFiles, ...filesArray];

        if (uploaded.length > 5) {
          setFormDataErrors({ ...formDataErrors, nftFilesError: true });
          setAddNormalFiles(false);
          return;
        }
        setFormDataErrors({ ...formDataErrors, nftFilesError: false });
        setFormData({ ...formData, nftFiles: uploaded });
        setAddNormalFiles(false);
      } else {
        setFormDataErrors({ ...formDataErrors, nftFilesError: true });
      }
    } else if (!e.target.multiple) {
      if (files && files[0]) {
        setFormData({ ...formData, nftThumbnail: files[0] });
        setAddThumbnail(false);
        setFormDataErrors({ ...formDataErrors, nftThumbnailError: false });
      } else {
        setFormDataErrors({ ...formDataErrors, nftThumbnailError: true });
      }
    }
  };
  const onButtonClick = () => {
    inputFileRef?.current?.click();
  };
  const onButtonClickThumbnail = () => {
    inputThumbnailRef?.current?.click();
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
      if (newFiles.files.length === 0) {
        setFormDataErrors({ ...formDataErrors, nftFilesError: true });
      }
    }

    setFormData({ ...formData, nftFiles: filteredNftFiles });
  };
  const deleteThumbnail = () => {
    if (inputThumbnailRef.current !== null) {
      inputFileRef.current!.files = null;
    }
    setFormData({ ...formData, nftThumbnail: null });
    setFormDataErrors({ ...formDataErrors, nftThumbnailError: true });
  };
  const viewFile = (file: File) => {
    setViewImage(true);
    setOverlayImageSrc(URL.createObjectURL(file));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Modal
        showModal={viewImage}
        setShowModal={setViewImage}
        onClose={() => setOverlayImageSrc('')}
      >
        <picture>
          <source src={overlayImageSrc} />
          <img
            src={overlayImageSrc}
            alt="overlay"
            className="rounded-md max-h-96 md:max-h-[60rem] md:h-full mx-auto"
          />
        </picture>
      </Modal>
      {/* in modal */}
      <h4 className="text-lg mb-3 mt-8 font-bold">Upload Files</h4>
      <p className="text-sm mb-8">
        The files will be minted in your NFT. The order in which the files are
        displayed represents the order of the files on the NFT. The NFT can
        include up to 6 files including the thumbnail.
      </p>

      <section className=" space-y-3 text-sm mb-14 max-w-full ">
        <p className="font-bold text-sm">Thumbnail</p>
        <p>The thumbnail needs to be an image.</p>
        {formDataErrors.nftThumbnailError && focus && (
          <ErrorMessage errorText="Thumbnail is required." />
        )}
        <Modal setShowModal={setAddThumbnail} showModal={addThumbnail}>
          <h4 className="text-lg mb-5 font-bold">Upload Thumbnail</h4>

          <label
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            htmlFor="input-file-upload"
            className={classNames(
              'h-72 px-20 border-black border-dashed  w-full rounded-xl border-2 flex flex-col cursor-pointer items-center justify-center',
              dragActive ? 'bg-black/20' : '',
            )}
          >
            <input
              ref={inputThumbnailRef}
              accept="image/jpeg, image/png, image/gif"
              type="file"
              name="nftThumbnail"
              id="input-file-upload"
              multiple={false}
              required
              className="hidden"
              onChange={handleChange}
            />

            <UploadFile />
            <p className="my-5 text-sm text-center text-gray-400 whitespace-nowrap">
              Click to browse or
              <br />
              drag and drop your files.
            </p>
            <Button
              title="Add Files"
              className="bg-black text-white w-full rounded-md hover:bg-black/80 z-10"
              onClick={onButtonClickThumbnail}
            />
          </label>
          <ul className="text-sm mt-6 list-disc px-[5%] ">
            <li>1 Image File, max. 20 mb filesize</li>
          </ul>
        </Modal>
        {formData.nftThumbnail && (
          <>
            <FileInformation
              key={formData.nftThumbnail.size}
              number={0}
              fileName={getFileName(formData.nftThumbnail)}
              fileSize={formatBytes(formData.nftThumbnail.size)}
              fileType={getFileType(formData.nftThumbnail)}
              crossIconClick={() => deleteThumbnail()}
              viewIconClick={() => viewFile(formData.nftThumbnail!)}
            />

            <p>Delete the image above to add a new thumbnail.</p>
          </>
        )}
        {!formData.nftThumbnail && (
          <Button
            onClick={() => setAddThumbnail(true)}
            className="bg-black text-white rounded-md w-1/2"
            title="Add Thumbnail"
            buttonHeight={10}
          />
        )}
        <p className="font-bold text-sm mt-10">Other Files</p>
        <p>
          Other files can a maximum of five files. Images, videos and 3D files
          are supported.
        </p>
        <div>
          {formDataErrors.nftFilesError && (
            <ErrorMessage errorText="Invalid number of files." />
          )}
        </div>
        {formData?.nftFiles?.map((file: File, index: number) => (
          <FileInformation
            key={file.size}
            number={index + 1}
            fileName={getFileName(file)}
            fileSize={formatBytes(file.size)}
            fileType={getFileType(file)}
            crossIconClick={() => deleteFile(file)}
            viewIconClick={() => viewFile(file)}
          />
        ))}

        {formData?.nftFiles?.length < 5 && (
          <Button
            onClick={() => setAddNormalFiles(true)}
            className="bg-black text-white rounded-md w-1/2"
            title="Add normal files(s)"
            buttonHeight={10}
          />
        )}

        <Modal setShowModal={setAddNormalFiles} showModal={addNormalFiles}>
          <h4 className="text-lg mb-5 font-bold">Upload Files</h4>

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
              name="nftFiles"
              className="hidden"
              onChange={handleChange}
            />

            <UploadFile />
            <p className="my-5 text-sm text-center text-gray-400 whitespace-nowrap">
              Click to browse or
              <br />
              drag and drop your files.
            </p>
            <Button
              title="Add Files"
              className="bg-black text-white w-full rounded-md hover:bg-black/80 z-10"
              onClick={onButtonClick}
            />
          </label>
          <ul className="text-sm mt-6 list-disc px-[5%] ">
            <li>Up to 5 files and 100mb in total size</li>
            <li>
              <div className="whitespace-nowrap flex items-center">
                <span>Support of image, video and 3D files</span>
                <Tooltip className="ml-1">
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
        </Modal>
      </section>
      <hr />
    </>
  );
};

export default FileUploadSection;
