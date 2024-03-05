import styled from '@emotion/styled';
import { Box, Button, Divider, Flex, theme } from 'concept-be-design-system';
import { ChangeEvent, useState } from 'react';

import { useFocusComment } from '../contexts/CommentFocusContext';

interface Props {
  feedId: string;
}

const WriteComment = ({ feedId }: Props) => {
  const [commentInput, setCommentInput] = useState<string>('');
  const { textareaRef, isFocusComment, focusCommentTextarea, blurCommentTextarea } = useFocusComment();

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  return (
    <Box position="relative">
      <Textarea
        isFocus={isFocusComment}
        ref={textareaRef}
        rows={1}
        value={commentInput}
        onChange={onChangeTextarea}
        placeholder="댓글을 입력해 주세요."
        onFocus={focusCommentTextarea}
        onBlur={blurCommentTextarea}
      />
      <Divider color="l3" />
      <Flex>
        <Button>취소</Button>
        <Button>등록</Button>
      </Flex>
    </Box>
  );
};

const Textarea = styled.textarea<{ isFocus: boolean }>`
  border-radius: 6px;
  width: 100%;
  height: ${({ isFocus }) => isFocus && '209px'};
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  background-color: ${theme.color.bg1};
  color: ${theme.color.t};
  font-style: normal;
  font-family: SUIT;
  font-weight: 400;
  line-height: normal;

  ::placeholder {
    color: ${theme.color.ba};
  }
`;

export default WriteComment;
