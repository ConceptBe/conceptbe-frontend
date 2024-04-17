import styled from '@emotion/styled';
import { Box, Flex, ImageView, PNGDefaultProfileInfo36, Text, TextDivider } from 'concept-be-design-system';

import { formatCommentDate } from '../../Feed/utils/formatCommentDate';
import useNavigatePage from '../../hooks/useNavigatePage';

interface Props {
  memberId: number;
  imageUrl: string;
  nickname: string;
  mainSkill: string;
  createdAt: string;
  owner: boolean;
}

const CommentProfileInfo = ({ memberId, imageUrl, nickname, mainSkill, createdAt, owner }: Props) => {
  const { goProfilePage } = useNavigatePage();

  const onClickProfileImage = () => {
    if (owner) return;

    goProfilePage(memberId);
  };

  return (
    <Flex gap={10} onClick={onClickProfileImage} cursor={owner ? '' : 'pointer'}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <ImageView src={imageUrl} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
      </Box>
      <Flex paddingTop={2} direction="column" gap={4}>
        <Text font="suit14m" color="b4">
          {nickname}
        </Text>
        <Flex wrap="wrap" alignItems="center" gap={4}>
          <FixedSizeText font="suit12r" color="b9">
            {mainSkill}
          </FixedSizeText>
          <TextDivider left={2} right={2} color="l2" />
          <Text font="suit12r" color="b9">
            {formatCommentDate(createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const FixedSizeText = styled(Text)`
  width: max-content;
`;

export default CommentProfileInfo;
