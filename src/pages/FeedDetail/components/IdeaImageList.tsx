import styled from '@emotion/styled';
import { Box } from 'concept-be-design-system';
import { useState } from 'react';

import ImageCarousel from './ImageCarousel';
import { ImageResponse } from '../types';

interface Props {
  imageResponses: ImageResponse[];
}

const IdeaImageList = ({ imageResponses }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  return (
    <Box margin="0 0 0 22px">
      <Wrapper>
        {imageResponses.map(({ id, imageUrl }, index) => (
          <Item key={id} onClick={() => handleImageClick(index)}>
            <Image src={imageUrl} alt={`Thumbnail ${index}`} />
          </Item>
        ))}
      </Wrapper>
      {selectedIndex !== null && (
        <ImageCarousel
          imageUrls={imageResponses.map((response) => response.imageUrl)}
          initialIndex={selectedIndex}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default IdeaImageList;

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  gap: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex: 0 0 auto;
`;

const Image = styled.img`
  object-fit: cover;
  width: 120px;
  height: 120px;
`;
