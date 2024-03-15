import { Text, Box, Flex, ImageView, PNGDefaultProfileInfo36 } from 'concept-be-design-system';

interface Props {
  imageUrl: string;
  nickname: string;
}

// TODO: 프로필 이미지 사진 오류 시 보여줄 기본 프로필 이미지 사진 URL

const WriteCommentProfileInfo = ({ imageUrl, nickname }: Props) => {
  return (
    <Flex alignItems="center" gap={10}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <ImageView src={imageUrl} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
      </Box>
      <Text font="suit14m" color="b4">
        {nickname}
      </Text>
    </Flex>
  );
};

export default WriteCommentProfileInfo;
