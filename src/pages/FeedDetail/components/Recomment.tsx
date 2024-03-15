import { Box, Flex, SVGFeedLike, SVGFeedReCommentLine, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';
import { useState } from 'react';

import CommentProfileInfo from './CommentProfileInfo';
import EditComment from './EditComment';
import ModifyDropdown from './ModifyDropdown';
import { get999PlusCount } from '../../utils';
import useDeleteCommentMutation from '../hooks/mutations/useDeleteComment';
import useFocusEditComment from '../hooks/useFocusEditComment';
import useToggleLikeComment from '../hooks/useToggleLikeComment';
import { CommentChildResponse } from '../types';

interface Props {
  feedId: string;
  recomment: CommentChildResponse;
  myImageUrl: string;
  myNickname: string;
}

const Recomment = ({
  feedId,
  myImageUrl,
  myNickname,
  recomment: {
    childCommentId,
    profileImageUrl,
    nickname,
    memberSkills,
    content,
    likesCount,
    owner,
    createdAt,
    deleted,
    likes,
  },
}: Props) => {
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const { deleteComment } = useDeleteCommentMutation({ feedId });
  const toggleLikeComment = useToggleLikeComment({ feedId, commentId: childCommentId, isLike: likes });

  useFocusEditComment({ focusCondition: isEditComment });

  const onCloseEditCommentTextarea = () => {
    setIsEditComment(false);
  };

  const onEditComment = () => {
    setIsEditComment(true);
  };

  const onDeleteComment = () => {
    //TODO: #54 머지 후 Confirm 컴포넌트로 대체
    if (confirm('답글을 삭제하시겠습니까?')) deleteComment(childCommentId);
  };

  return (
    <>
      {isEditComment ? (
        <EditComment
          feedId={feedId}
          commentId={childCommentId}
          content={content}
          myImageUrl={myImageUrl}
          myNickname={myNickname}
          onCloseEditCommentTextarea={onCloseEditCommentTextarea}
          isRecomment
        />
      ) : (
        <Flex justifyContent="space-between">
          <Flex gap={10}>
            <div>
              <SVGFeedReCommentLine />
            </div>
            <Box margin="0 0 20px 0">
              <CommentProfileInfo
                imageUrl={profileImageUrl}
                nickname={nickname}
                skillList={memberSkills}
                createdAt={createdAt}
              />
              <Spacer size={20} />
              <Text font="suit14r" color="t" style={{ lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
                {deleted ? '삭제된 답글입니다.' : content}
              </Text>
              <Spacer size={10} />
              <Flex>
                <Flex alignItems="center" gap={4} onClick={toggleLikeComment} cursor="pointer">
                  {likes ? <SVGFeedLike /> : <SVGFeedUnLike />}
                  <Text font="suit12r" color="b9">
                    {get999PlusCount(likesCount)}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          {!deleted && <ModifyDropdown owner={owner} onEdit={onEditComment} onDelete={onDeleteComment} isInComment />}
        </Flex>
      )}
    </>
  );
};

export default Recomment;
