import { Text, Box, Flex, ImageView, PNGDefaultProfileInfo36 } from 'concept-be-design-system';

import useNavigatePage from '../pages/hooks/useNavigatePage';

interface Props {
  memberId: number;
  imageUrl: string;
  nickname: string;
  mainSkill: string;
}

// TODO: 프로필 이미지 사진 오류 시 보여줄 기본 프로필 이미지 사진 URL

const ProfileInfo = ({ memberId, imageUrl, nickname, mainSkill }: Props) => {
  const { goProfilePage } = useNavigatePage();

  return (
    <Flex alignItems="center" gap={10} onClick={() => goProfilePage(memberId)} cursor="pointer">
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <ImageView src={imageUrl} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
      </Box>
      <Flex direction="column" gap={4}>
        <Text font="suit14m" color="b4">
          {nickname}
        </Text>
        <Flex alignItems="center">
          <Text font="suit12r" color="b9">
            {mainSkill}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileInfo;
