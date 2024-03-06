import { Box, Flex, SVGFeedReCommentLine, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';

import ProfileInfo from '../../../components/ProfileInfo';
import { get999PlusCount } from '../../utils';
import { CommentChildResponse } from '../types';

interface Props {
  recomment: CommentChildResponse;
}

const Recomment = ({ recomment: { nickname, memberSkills, content, likesCount } }: Props) => {
  return (
    <Flex gap={10}>
      <div>
        <SVGFeedReCommentLine />
      </div>
      <Box margin="0 0 20px 0">
        <ProfileInfo imageUrl={''} nickname={nickname} skillList={memberSkills} />
        <Spacer size={20} />
        <Text font="suit14r" color="t" style={{ lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
          {content}
        </Text>
        <Spacer size={10} />
        <Flex>
          <Flex alignItems="center" gap={4}>
            <SVGFeedUnLike />
            <Text font="suit12r" color="b9">
              {get999PlusCount(likesCount)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Recomment;
