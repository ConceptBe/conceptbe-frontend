import { Box, Flex, SVGFeedMessage, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';
import { useEffect, useState } from 'react';

import Recomment from './Recomment';
import WriteRecomment from './WriteRecomment';
import ProfileInfo from '../../../components/ProfileInfo';
import { get999PlusCount } from '../../utils';
import { useFocusRecommentTextareaContext } from '../contexts/CommentFocusContext';
import { CommentParentResponse } from '../types';

interface Props {
  feedId: string;
  myImageUrl: string;
  myNickname: string;
  mySkillList: string[];
  comment: CommentParentResponse;
}

const Comment = ({
  feedId,
  myImageUrl,
  myNickname,
  mySkillList,
  comment: { nickname, memberSkills, content, likesCount, commentCount, commentChildResponses },
}: Props) => {
  const [isOpenRecommentTextarea, setIsOpenRecommentTextarea] = useState<boolean>(false);
  const { focusRecommentTextarea, initRecommentTextareaRef } = useFocusRecommentTextareaContext();

  const onOpenRecommentTextarea = () => {
    if (isOpenRecommentTextarea) return;
    setIsOpenRecommentTextarea(true);
  };

  const onCloseRecommentTextarea = () => {
    setIsOpenRecommentTextarea(false);
  };

  useEffect(() => {
    if (!isOpenRecommentTextarea) {
      initRecommentTextareaRef();
      return;
    }

    focusRecommentTextarea();
  }, [isOpenRecommentTextarea, focusRecommentTextarea, initRecommentTextareaRef]);

  return (
    <>
      <Box margin="20px 0">
        <ProfileInfo imageUrl={''} nickname={nickname} skillList={memberSkills} />
        <Spacer size={20} />
        <Text font="suit14r" color="t" style={{ lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
          {content}
        </Text>
        <Spacer size={10} />
        <Flex>
          <Flex alignItems="center" cursor="pointer" gap={4} onClick={onOpenRecommentTextarea}>
            <SVGFeedMessage />
            <Text font="suit12r" color="b9">
              {commentCount > 0 ? get999PlusCount(commentCount) : '댓글작성'}
            </Text>
          </Flex>
          <Spacer size={14} />
          <Flex alignItems="center" gap={4}>
            <SVGFeedUnLike />
            <Text font="suit12r" color="b9">
              {get999PlusCount(likesCount)}
            </Text>
          </Flex>
        </Flex>
      </Box>
      {commentChildResponses.map((recomment, idx) => (
        <Recomment key={idx} recomment={recomment} />
      ))}
      {isOpenRecommentTextarea && (
        <WriteRecomment
          feedId={feedId}
          imageUrl={myImageUrl}
          nickname={myNickname}
          skillList={mySkillList}
          onCloseRecommentTextarea={onCloseRecommentTextarea}
        />
      )}
    </>
  );
};

export default Comment;
