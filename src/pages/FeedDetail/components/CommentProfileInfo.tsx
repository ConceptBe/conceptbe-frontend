import styled from '@emotion/styled';
import { Text, Box, Flex } from 'concept-be-design-system';

interface Props {
  imageUrl: string;
  nickname: string;
}

// TODO: 프로필 이미지 사진 오류 시 보여줄 기본 프로필 이미지 사진 URL
const DEFAULT_IMAGE_URL = '';

const CommentProfileInfo = ({ imageUrl, nickname }: Props) => {
  return (
    <Flex alignItems="center" gap={10}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <Img src={imageUrl || DEFAULT_IMAGE_URL} />
      </Box>
      <Text font="suit14m" color="b4">
        {nickname}
      </Text>
    </Flex>
  );
};

export default CommentProfileInfo;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
