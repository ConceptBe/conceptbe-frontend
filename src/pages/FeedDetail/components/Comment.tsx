import { Box, Flex, SVGFeedLike, SVGFeedMessage, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';
import { useState } from 'react';

import CommentProfileInfo from './CommentProfileInfo';
import EditComment from './EditComment';
import ModifyDropdown from './ModifyDropdown';
import Recomment from './Recomment';
import WriteRecomment from './WriteRecomment';
import useConfirm from '../../../hooks/useConfirm';
import HyperLinkText from '../../components/HyperLinkText/HyperLinkText';
import { get999PlusCount } from '../../utils';
import useDeleteCommentMutation from '../hooks/mutations/useDeleteComment';
import useFocusEditComment from '../hooks/useFocusEditComment';
import useFocusRecomment from '../hooks/useFocusRecomment';
import useToggleLikeComment from '../hooks/useToggleLikeComment';
import { CommentParentResponse } from '../types';

interface Props {
  feedId: string;
  myImageUrl: string;
  myNickname: string;
  comment: CommentParentResponse;
}

const Comment = ({
  feedId,
  myImageUrl,
  myNickname,
  comment: {
    memberId,
    parentCommentId,
    nickname,
    profileImageUrl,
    createdAt,
    memberMainSkill,
    content,
    likesCount,
    commentCount,
    commentChildResponses,
    owner,
    deleted,
    likes,
  },
}: Props) => {
  const openConfirm = useConfirm();
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [isOpenRecommentTextarea, setIsOpenRecommentTextarea] = useState<boolean>(false);
  const { deleteComment } = useDeleteCommentMutation({ feedId });
  const toggleLikeComment = useToggleLikeComment({ feedId, commentId: parentCommentId, isLike: likes });

  useFocusEditComment({ focusCondition: isEditComment });
  useFocusRecomment({ focusCondition: isOpenRecommentTextarea });

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

  const onDeleteComment = async () => {
    if (await openConfirm({ content: '댓글을 삭제하시겠습니까?' })) deleteComment(parentCommentId);
  };

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
              memberId={memberId}
              imageUrl={profileImageUrl}
              nickname={nickname}
              mainSkill={memberMainSkill}
              createdAt={createdAt}
              owner={owner}
            />
            {!deleted && <ModifyDropdown owner={owner} isInComment onEdit={onEditComment} onDelete={onDeleteComment} />}
          </Flex>
          <Spacer size={20} />
          <HyperLinkText font="suit14r" color="t" lineHeight="22px">
            {deleted ? '삭제된 댓글입니다.' : content}
          </HyperLinkText>
          <Spacer size={10} />
          <Flex>
            <Flex alignItems="center" cursor="pointer" gap={4} onClick={onOpenRecommentTextarea}>
              <SVGFeedMessage />
              <Text font="suit12r" color="b9">
                {commentCount > 0 ? get999PlusCount(commentCount) : '댓글작성'}
              </Text>
            </Flex>
            <Spacer size={14} />
            <Flex alignItems="center" gap={4} onClick={toggleLikeComment} cursor="pointer">
              {likes ? <SVGFeedLike /> : <SVGFeedUnLike />}
              <Text font="suit12r" color="b9">
                {get999PlusCount(likesCount)}
              </Text>
            </Flex>
          </Flex>
        </Box>
      )}

      {commentChildResponses.map((recomment) => (
        <Recomment
          key={recomment.childCommentId}
          feedId={feedId}
          recomment={recomment}
          myImageUrl={myImageUrl}
          myNickname={myNickname}
        />
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
