const getFileType = function (file: File) {
  return file?.type?.split('/')[1];
};
export default getFileType;
