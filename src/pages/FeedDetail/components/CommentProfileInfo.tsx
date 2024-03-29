import styled from '@emotion/styled';
import { Box, Flex, ImageView, PNGDefaultProfileInfo36, Text, TextDivider } from 'concept-be-design-system';
import { Fragment } from 'react';

import { formatCommentDate } from '../../Feed/utils/formatCommentDate';

interface Props {
  imageUrl: string;
  nickname: string;
  skillList: string[];
  createdAt: string;
}

const CommentProfileInfo = ({ imageUrl, nickname, skillList, createdAt }: Props) => {
  return (
    <Flex gap={10}>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <ImageView src={imageUrl} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
      </Box>
      <Flex paddingTop={2} direction="column" gap={4}>
        <Text font="suit14m" color="b4">
          {nickname}
        </Text>
        <Flex wrap="wrap" alignItems="center" gap={4}>
          {skillList.map((skill) => (
            <Fragment key={skill}>
              <FixedSizeText font="suit12r" color="b9">
                {skill}
              </FixedSizeText>
              <TextDivider left={2} right={2} color="l2" />
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

const FixedSizeText = styled(Text)`
  width: max-content;
`;

export default CommentProfileInfo;
