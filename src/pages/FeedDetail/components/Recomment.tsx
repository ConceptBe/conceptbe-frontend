import { Box, Flex, SVGFeedReCommentLine, SVGFeedUnLike, Spacer, Text } from 'concept-be-design-system';
import { useEffect, useState } from 'react';

import EditComment from './EditComment';
import ModifyDropdown from './ModifyDropdown';
import ProfileInfo from '../../../components/ProfileInfo';
import { get999PlusCount } from '../../utils';
import { useFocusEditCommentTextareaContext } from '../contexts/CommentFocusContext';
import useDeleteCommentMutation from '../hooks/mutations/useDeleteComment';
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
  recomment: { childCommentId, profileImageUrl, nickname, memberSkills, content, likesCount, owner },
}: Props) => {
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const { focusEditCommentTextarea, initEditCommentTextarea } = useFocusEditCommentTextareaContext();
  const { deleteComment } = useDeleteCommentMutation({ feedId });

  const onCloseEditCommentTextarea = () => {
    setIsEditComment(false);
  };

  const onEditComment = () => {
    setIsEditComment(true);
  };

  const onDeleteComment = () => {
    deleteComment(childCommentId);
  };

  useEffect(() => {
    if (!isEditComment) {
      initEditCommentTextarea();
      return;
    }

    focusEditCommentTextarea();
  }, [isEditComment, focusEditCommentTextarea, initEditCommentTextarea]);

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
              <ProfileInfo imageUrl={profileImageUrl} nickname={nickname} skillList={memberSkills} />
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
          <ModifyDropdown owner={owner} onEdit={onEditComment} onDelete={onDeleteComment} isInComment />
        </Flex>
      )}
    </>
  );
};

export default Recomment;
