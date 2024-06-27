import styled from '@emotion/styled';
import { Box, Flex, SVGCancel, theme } from 'concept-be-design-system';
import { useState } from 'react';
import useAlert from '../../../hooks/useAlert';
import useCompressImage from '../../Write/hooks/useCompressImage';
import { ImageResponse } from '../types';

interface Props {
  images: ImageResponse[];
  imageFiles: File[];
  onAddImages: (images: File[]) => void;
  onDeleteImage: (id: number) => void; // 서버에 있는 이미지
  onDeleteImageFiles: (index: number) => void; // 클라이언트에서 추가한 이미지
}

type ImageUrls =
  | {
      id: number;
      ideaId: number;
      imageUrl: string;
    }
  | string;

interface DeleteProps {
  id?: number;
  index: number;
  imageUrl: string;
}

const FROM_SERVER_IMAGE = 'cloudfront';

// let addId = -1;

const UpdateImages = ({ images, imageFiles, onAddImages, onDeleteImage, onDeleteImageFiles }: Props) => {
  const openAlert = useAlert();
  const { compressImages } = useCompressImage();
  const [imageUrls, setImageUrls] = useState<ImageUrls[]>(images);

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImages = e.target.files;

    if (!currentImages) return;
    if (images.length + imageFiles.length + currentImages.length > 3) {
      openAlert({ content: '이미지는 최대 3개까지 업로드 가능합니다.' });
      return;
    }

    const compressedImages = await compressImages(currentImages);
    const imageObjectUrls = compressedImages.map((image) => URL.createObjectURL(image));

    onAddImages(compressedImages);
    setImageUrls([...imageUrls, ...imageObjectUrls]);
  };

  const onClickDeleteImage = ({ id, index, imageUrl }: DeleteProps) => {
    if (imageUrl.includes(FROM_SERVER_IMAGE) && id) {
      onDeleteImage(id);
      setImageUrls(imageUrls.filter((_, idx) => idx !== index));
      return;
    }

    onDeleteImageFiles(index);
    setImageUrls(imageUrls.filter((_, idx) => idx !== index));
  };

  return (
    <Wrapper width="100%" height="100%" padding="22px" overflow="scroll" boxSizing="border-box">
      <Flex gap={8}>
        <AddImageLabel htmlFor="add-image">+</AddImageLabel>
        <AddImageInput id="add-image" type="file" multiple onChange={onChangeImage}></AddImageInput>
        {imageUrls.map((image, index) => {
          if (typeof image === 'string') {
            return (
              <Box position="relative" key={index}>
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
                  <SVGCancel color="white" onClick={() => onClickDeleteImage({ index, imageUrl: image })} />
                </Flex>
                <Image src={image} alt={`이미지 ${index + 1}`} />
              </Box>
            );
          }

          return (
            <Box position="relative" key={index}>
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
                <SVGCancel
                  color="white"
                  onClick={() => onClickDeleteImage({ id: image.id, index, imageUrl: image.imageUrl })}
                />
              </Flex>
              <Image src={image.imageUrl} alt={`이미지 ${index + 1}`} />
            </Box>
          );
        })}
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
