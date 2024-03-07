import styled from '@emotion/styled';
import { Box, Flex, Text, TextDivider } from 'concept-be-design-system';
import { Fragment } from 'react';

import { DEFAULT_IMAGE_URL } from '../../../constants';
import { formatCommentDate } from '../../Feed/utils/formatCommentDate';

interface Props {
  imageUrl: string;
  nickname: string;
  skillList: string[];
  createdAt: string;
}

const CommentProfileInfo = ({ imageUrl, nickname, skillList, createdAt }: Props) => {
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
          {skillList.map((skill) => (
            <Fragment key={skill}>
              <Text font="suit12r" color="b9">
                {skill}
              </Text>
              <TextDivider left={6} right={6} color="l2" />
            </Fragment>
          ))}
          <Text font="suit12r" color="b9">
            {formatCommentDate(createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default CommentProfileInfo;