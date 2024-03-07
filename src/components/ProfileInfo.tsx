import styled from '@emotion/styled';
import { Text, TextDivider, Box, Flex } from 'concept-be-design-system';
import { Fragment } from 'react';

import { DEFAULT_IMAGE_URL } from '../constants';

interface Props {
  imageUrl: string;
  nickname: string;
  skillList: string[];
}

// TODO: 프로필 이미지 사진 오류 시 보여줄 기본 프로필 이미지 사진 URL

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
            <Fragment key={skill}>
              <Text font="suit12r" color="b9">
                {skill}
              </Text>
              {idx !== skillList.length - 1 && <TextDivider left={6} right={6} color="l2" />}
            </Fragment>
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
