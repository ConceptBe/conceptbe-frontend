import imageCompression from 'browser-image-compression';

const useCompressImage = () => {
  const compressImage = async (file: File) => {
    const resizingBlob = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 2200,
      useWebWorker: true,
    });
    const compressedImage = new File([resizingBlob], file.name, {
      type: file.type,
    });

    return compressedImage;
  };

  const compressImages = async (files: FileList) => {
    const compressedImages = await Promise.all(
      [...files].map((file) => new Promise((resolve) => resolve(compressImage(file)))),
    );

    return compressedImages as File[];
  };

  return { compressImage, compressImages };
};

export default useCompressImage;
