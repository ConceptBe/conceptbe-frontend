import styled from '@emotion/styled';
import { Box, Button, Divider, Flex, Text, theme } from 'concept-be-design-system';
import { ChangeEvent, useState } from 'react';

import WriteCommentProfileInfo from './WriteCommentProfileInfo';
import { ROOT_COMMENT_ID } from '../../../constants';
import { useFocusCommentTextareaContext } from '../contexts/CommentFocusContext';
import usePostCommentMutation from '../hooks/mutations/usePostCommentMutation';

interface Props {
  feedId: string;
  myImageUrl: string;
  myNickname: string;
}

const WriteComment = ({ feedId, myImageUrl, myNickname }: Props) => {
  const [commentInput, setCommentInput] = useState<string>('');
  const { commentTextareaRef, isFocusComment, openCommentTextarea, closeCommentTextarea } =
    useFocusCommentTextareaContext();
  const { postComment } = usePostCommentMutation({ feedId });

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value.substring(0, 500));
  };

  const onBlurTextarea = () => {
    if (commentInput.length > 0) return;
    closeCommentTextarea();
  };

  const onCancelComment = () => {
    setCommentInput('');
    closeCommentTextarea();
  };

  const onSubmitComment = () => {
    postComment(
      { ideaId: feedId, parentId: ROOT_COMMENT_ID, content: commentInput },
      {
        onSuccess: () => {
          setCommentInput('');
          closeCommentTextarea();
        },
      },
    );
  };

  return (
    <Box position="relative">
      {isFocusComment && (
        <Box
          width="100%"
          boxSizing="border-box"
          backgroundColor="bg1"
          padding="15px 20px 0 20px"
          borderRadius="6px 6px 0 0"
        >
          <WriteCommentProfileInfo imageUrl={myImageUrl} nickname={myNickname} />
        </Box>
      )}
      <Textarea
        isFocus={isFocusComment}
        ref={commentTextareaRef}
        rows={1}
        value={commentInput}
        onChange={onChangeTextarea}
        placeholder="댓글을 입력해 주세요."
        onFocus={openCommentTextarea}
        onBlur={onBlurTextarea}
      />
      {isFocusComment && (
        <Box width="100%" padding="10px 20px" boxSizing="border-box" backgroundColor="bg1" borderRadius="0 0 6px 6px">
          <Divider color="l3" bottom={10} />
          <Flex justifyContent="space-between" alignItems="center">
            <Flex>
              <Text color="c1">{commentInput.length}</Text>
              <Text color="ba">/500</Text>
            </Flex>
            <Flex width={96} justifyContent="space-between">
              <CancelButton isGrayOut onClick={onCancelComment}>
                취소
              </CancelButton>
              <ConfirmButton onClick={onSubmitComment}>등록</ConfirmButton>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

const Textarea = styled.textarea<{ isFocus: boolean }>`
  display: block;
  border-radius: ${({ isFocus }) => (isFocus ? '0' : '6px')};
  width: 100%;
  height: ${({ isFocus }) => isFocus && '80px'};
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  background-color: ${theme.color.bg1};
  color: ${theme.color.b4};
  font-size: ${theme.font.suit14r.fontSize}px;
  font-weight: ${theme.font.suit14r.fontWeight};
  line-height: 160%;

  ::placeholder {
    color: ${theme.color.ba};
  }
`;

const CancelButton = styled(Button)`
  width: 43px;
  height: 32px;
  color: ${theme.color.b6};
  background-color: ${theme.color.l3};
  font-size: ${theme.font.suit13m.fontSize}px;
  font-weight: ${theme.font.suit13m.fontWeight};
  padding: 6px 10px;
`;

const ConfirmButton = styled(Button)`
  width: 43px;
  height: 32px;
  font-size: ${theme.font.suit13m.fontSize}px;
  font-weight: ${theme.font.suit13m.fontWeight};
  padding: 6px 10px;
`;

export default WriteComment;
