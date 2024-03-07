import { Box, Flex, SVGFeedMessage, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';
import { useEffect, useState } from 'react';

import CommentProfileInfo from './CommentProfileInfo';
import EditComment from './EditComment';
import ModifyDropdown from './ModifyDropdown';
import Recomment from './Recomment';
import WriteRecomment from './WriteRecomment';
import { get999PlusCount } from '../../utils';
import { useFocusRecommentTextareaContext } from '../contexts/CommentFocusContext';
import useDeleteCommentMutation from '../hooks/mutations/useDeleteComment';
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
  comment: {
    parentCommentId,
    nickname,
    profileImageUrl,
    createdAt,
    memberSkills,
    content,
    likesCount,
    commentCount,
    commentChildResponses,
    owner,
  },
}: Props) => {
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [isOpenRecommentTextarea, setIsOpenRecommentTextarea] = useState<boolean>(false);
  const { focusRecommentTextarea, initRecommentTextareaRef } = useFocusRecommentTextareaContext();

  const onOpenRecommentTextarea = () => {
    if (isOpenRecommentTextarea) return;
    setIsOpenRecommentTextarea(true);
  };

  const onCloseRecommentTextarea = () => {
    setIsOpenRecommentTextarea(false);
  };

  const onCloseEditCommentTextarea = () => {
    setIsEditComment(false);
  };

  const onEditComment = () => {
    setIsEditComment(true);
  };

  const onDeleteComment = () => {
    //
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
      {isEditComment ? (
        <EditComment
          feedId={feedId}
          commentId={parentCommentId}
          content={content}
          myImageUrl={myImageUrl}
          myNickname={myNickname}
          onCloseEditCommentTextarea={onCloseEditCommentTextarea}
        />
      ) : (
        <Box margin="20px 0">
          <Flex justifyContent="space-between">
            <CommentProfileInfo
              imageUrl={profileImageUrl}
              nickname={nickname}
              skillList={memberSkills}
              createdAt={createdAt}
            />
            <ModifyDropdown owner={owner} isInComment onEdit={onEditComment} onDelete={onDeleteComment} />
          </Flex>
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
      )}

      {commentChildResponses.map((recomment, idx) => (
        <Recomment key={idx} feedId={feedId} recomment={recomment} myImageUrl={myImageUrl} myNickname={myNickname} />
      ))}
      {isOpenRecommentTextarea && (
        <WriteRecomment
          feedId={feedId}
          parentCommentId={parentCommentId}
          myImageUrl={myImageUrl}
          myNickname={myNickname}
          onCloseRecommentTextarea={onCloseRecommentTextarea}
        />
      )}
    </>
  );
};

export default Comment;
