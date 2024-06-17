import styled from '@emotion/styled';
import { Box } from 'concept-be-design-system';

import { ImageResponse } from '../types';

interface Props {
  imageResponses: ImageResponse[];
}

const IdeaImageList = ({ imageResponses }: Props) => {
  return (
    <Box margin="0 0 0 22px">
      <Wrapper>
        {imageResponses.map(({ id, imageUrl }) => (
          <Item>
            <img key={id} src={imageUrl} width={120} height={120} />
          </Item>
        ))}
      </Wrapper>
    </Box>
  );
};

export default IdeaImageList;

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  gap: 8px;
`;

const Item = styled.div`
  flex: 0 0 auto;
`;
