import { Box, Flex, ImageView, PNGDefaultProfileInfo36, Text } from 'concept-be-design-system';

import useNavigatePage from '../../hooks/useNavigatePage';

interface Props {
  memberId: number;
  imageUrl: string;
  nickname: string;
  mainSkill: string;
  owner: boolean;
}

const ProfileInfo = ({ memberId, imageUrl, nickname, mainSkill, owner }: Props) => {
  const { goProfilePage } = useNavigatePage();

  const onClickProfileInfo = () => {
    if (owner) return;

    goProfilePage(memberId);
  };

  return (
    <Flex alignItems="center" gap={10} onClick={onClickProfileInfo} cursor={owner ? '' : 'pointer'}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <ImageView src={imageUrl || PNGDefaultProfileInfo36} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
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
