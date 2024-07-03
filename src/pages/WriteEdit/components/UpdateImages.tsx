import styled from '@emotion/styled';
import { Box, Flex, SVGCancel, theme } from 'concept-be-design-system';
import useAlert from '../../../hooks/useAlert';
import useCompressImage from '../../Write/hooks/useCompressImage';
import { AddedImage, ImageResponse } from '../types';

type ImageType = AddedImage | ImageResponse;

interface Props {
  images: ImageType[];
  onAddImages: (images: AddedImage[]) => void;
  onDeleteImage: (id: number) => void;
}

let CLIENT_IMAGE_ADJUST_VALUE = -1;

const UpdateImages = ({ images, onAddImages, onDeleteImage }: Props) => {
  const openAlert = useAlert();
  const { compressImages } = useCompressImage();

  const onClickAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;

    if (!imageFileList) return;

    if (images.length + imageFileList.length > 3) {
      openAlert({ content: '이미지는 최대 3개까지 업로드 가능합니다.' });
    }

    const updatedImages = [...imageFileList].filter((_, idx) => idx < 3);
    const compressedImages = await compressImages(updatedImages);
    const imageObjectUrls = compressedImages.map((image) => URL.createObjectURL(image));

    const willAddedImages = compressedImages.map((image, idx) => ({
      id: CLIENT_IMAGE_ADJUST_VALUE--,
      imageUrl: imageObjectUrls[idx],
      imageFile: image,
    }));

    onAddImages(willAddedImages);
  };

  const onClickDeleteImage = (id: number) => {
    onDeleteImage(id);
  };

  return (
    <Wrapper width="100%" height="100%" padding="22px" overflow="scroll" boxSizing="border-box">
      <Flex gap={8}>
        <AddImageLabel htmlFor="add-image">+</AddImageLabel>
        <AddImageInput id="add-image" type="file" multiple onChange={onClickAddImage} />
        {images.map(({ id, imageUrl }, index) => (
          <Box position="relative" key={id} onClick={() => onClickDeleteImage(id)}>
            <Flex
              position="absolute"
              top="0"
              right="0"
              width={32}
              height={32}
              justifyContent="center"
              alignItems="center"
              backgroundColor="b6"
              cursor="pointer"
            >
              <SVGCancel color="white" />
            </Flex>
            <Image src={imageUrl} alt={`이미지 ${index + 1}`} />
          </Box>
        ))}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

const AddImageLabel = styled.label`
  width: 120px;
  height: 120px;
  background-color: ${theme.color.b4};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 100;
  color: ${theme.color.w1};
  cursor: pointer;
`;

const AddImageInput = styled.input`
  display: none;
`;

export default UpdateImages;
