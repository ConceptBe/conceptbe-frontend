import styled from '@emotion/styled';
import { Box, Button, Divider, Flex, theme, Text } from 'concept-be-design-system';
import { ChangeEvent, useState } from 'react';

import WriteCommentProfileInfo from './WriteCommentProfileInfo';
import { useFocusEditCommentTextareaContext } from '../contexts/CommentFocusContext';

interface Props {
  isRecomment?: boolean;
  content: string;
  commentId: string;
  feedId: string;
  myImageUrl: string;
  myNickname: string;
  onCloseEditCommentTextarea: () => void;
}

const EditComment = ({ isRecomment, content, feedId, myImageUrl, myNickname, onCloseEditCommentTextarea }: Props) => {
  const [commentInput, setCommentInput] = useState<string>(content);
  const { editCommentTextareaRef, initEditCommentTextarea } = useFocusEditCommentTextareaContext();

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value.substring(0, 500));
  };

  const onCancelEditComment = () => {
    setCommentInput('');
    onCloseEditCommentTextarea();
    initEditCommentTextarea();
  };

  const onSubmitComment = () => {};

  return (
    <Box margin={isRecomment ? '0 0 20px 24px' : '20px 0'} position="relative">
      <Box
        width="100%"
        boxSizing="border-box"
        backgroundColor="bg1"
        padding="15px 20px 0 20px"
        borderRadius="6px 6px 0 0"
      >
        <WriteCommentProfileInfo imageUrl={myImageUrl} nickname={myNickname} />
      </Box>

      <Textarea
        ref={editCommentTextareaRef}
        rows={1}
        value={commentInput}
        onChange={onChangeTextarea}
        placeholder="수정할 내용을 입력해 주세요."
        onBlur={initEditCommentTextarea}
      />

      <Box width="100%" padding="10px 20px" boxSizing="border-box" backgroundColor="bg1" borderRadius="0 0 6px 6px">
        <Divider color="l3" bottom={10} />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Text color="c1">{commentInput.length}</Text>
            <Text color="ba">/500</Text>
          </Flex>
          <Flex width={96} justifyContent="space-between">
            <CancelButton isGrayOut onClick={onCancelEditComment}>
              취소
            </CancelButton>
            <ConfirmButton onClick={onSubmitComment}>수정</ConfirmButton>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 80px;
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

export default EditComment;
