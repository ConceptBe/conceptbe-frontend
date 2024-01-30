import styled from '@emotion/styled';
import { Text, TextDivider, Box, Flex } from 'concept-be-design-system';

interface Props {
  imageUrl: string;
  nickname: string;
  skillList: string[];
}

const DEFAULT_IMAGE_URL = '';

const ProfileInfo = ({ imageUrl, nickname, skillList }: Props) => {
  return (
    <Flex alignItems="center" gap={10}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <Img src={imageUrl || DEFAULT_IMAGE_URL} />
      </Box>
      <Flex direction="column" gap={4}>
        <Text font="suit14m" color="b4">
          {nickname}
        </Text>
        <Flex alignItems="center">
          {skillList.map((skill, idx) => (
            <>
              <Text font="suit12r" color="b9">
                {skill}
              </Text>
              {idx !== skillList.length - 1 && <TextDivider left={6} right={6} color="l2" />}
            </>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileInfo;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
