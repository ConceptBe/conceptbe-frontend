import { Box, Flex, SVGFeedMessage, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';

import Recomment from './Recomment';
import ProfileInfo from '../../../components/ProfileInfo';
import { get999PlusCount } from '../../utils';
import { CommentParentResponse } from '../types';

interface Props {
  comment: CommentParentResponse;
}

const Comment = ({
  comment: { nickname, memberSkills, content, likesCount, commentCount, commentChildResponses },
}: Props) => {
  return (
    <>
      <Box margin="20px 0">
        <ProfileInfo imageUrl={''} nickname={nickname} skillList={memberSkills} />
        <Spacer size={20} />
        <Text font="suit14m" color="t" style={{ lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
          {content}
        </Text>
        <Spacer size={10} />
        <Flex>
          <Flex alignItems="center" gap={4}>
            <SVGFeedMessage />
            <Text font="suit12r" color="b9">
              {commentCount > 0 ? get999PlusCount(commentCount) : '댓글작성'}
            </Text>
          </Flex>
          <Spacer size={14} />
          <Flex alignItems="center" gap={4}>
            <SVGFeedUnLike />
            <Text font="suit12r" color="b9">
              좋아요
            </Text>
            <Text font="suit12b" color="b9">
              {get999PlusCount(likesCount)}
            </Text>
          </Flex>
        </Flex>
      </Box>
      {commentChildResponses.map((recomment, idx) => (
        <Recomment key={idx} recomment={recomment} />
      ))}
    </>
  );
};

export default Comment;
