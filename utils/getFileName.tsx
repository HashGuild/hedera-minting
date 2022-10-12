const getFileName = function (file: File) {
  return file?.name?.split('.')[0];
};
export default getFileName;
