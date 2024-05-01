import styled from '@emotion/styled';
import { Box, Flex, ImageView, PNGDefaultProfileInfo36, Text, TextDivider } from 'concept-be-design-system';

import { formatCommentDate } from '../../Feed/utils/formatCommentDate';
import useNavigatePage from '../../hooks/useNavigatePage';

interface Props {
  memberId: number | null;
  imageUrl: string | null;
  nickname: string | null;
  mainSkill: string | null;
  createdAt: string;
  owner: boolean;
}

const CommentProfileInfo = ({ memberId, imageUrl, nickname, mainSkill, createdAt, owner }: Props) => {
  const { goProfilePage } = useNavigatePage();
  const isShouldNotRoute = owner || !memberId;

  const onClickProfileImage = () => {
    if (isShouldNotRoute) return;

    goProfilePage(memberId);
  };

  return (
    <Flex gap={10} onClick={onClickProfileImage} cursor={isShouldNotRoute ? '' : 'pointer'}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <ImageView src={imageUrl || PNGDefaultProfileInfo36} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
      </Box>
      <Flex paddingTop={2} direction="column" gap={4}>
        <Text font="suit14m" color="b4">
          {nickname || '탈퇴한 회원'}
        </Text>
        <Flex wrap="wrap" alignItems="center" gap={4}>
          <FixedSizeText font="suit12r" color="b9">
            {mainSkill || '(알 수 없음)'}
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
