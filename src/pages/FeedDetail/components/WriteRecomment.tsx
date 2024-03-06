import styled from '@emotion/styled';
import { Box, Button, Divider, Flex, theme, Text } from 'concept-be-design-system';
import { ChangeEvent, useState } from 'react';

import ProfileInfo from '../../../components/ProfileInfo';
import { PARENT_COMMENT_ID } from '../../../constants';
import { useFocusRecommentTextareaContext } from '../contexts/CommentFocusContext';
import usePostCommentMutation from '../hooks/mutations/usePostCommentMutation';

interface Props {
  feedId: string;
  imageUrl: string;
  nickname: string;
  skillList: string[];
  onCloseRecommentTextarea: () => void;
}

const WriteRecomment = ({ feedId, imageUrl, nickname, skillList, onCloseRecommentTextarea }: Props) => {
  const [recommentInput, setRecommentInput] = useState<string>('');
  const { recommentTextareaRef, initRecommentTextareaRef } = useFocusRecommentTextareaContext();
  const { postComment } = usePostCommentMutation({
    feedId,
    onSuccess: () => {
      setRecommentInput('');
      onCloseRecommentTextarea();
    },
  });

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRecommentInput(e.target.value.substring(0, 500));
  };

  const onCancelComment = () => {
    setRecommentInput('');
    onCloseRecommentTextarea();
    initRecommentTextareaRef();
  };

  const onSubmitComment = () => {
    postComment({ ideaId: Number(feedId), parentId: PARENT_COMMENT_ID, content: recommentInput });
  };

  return (
    <Box margin="0 0 20px 24px" position="relative">
      <Box
        width="100%"
        boxSizing="border-box"
        backgroundColor="bg1"
        padding="15px 20px 0 20px"
        borderRadius="6px 6px 0 0"
      >
        <ProfileInfo imageUrl={imageUrl} nickname={nickname} skillList={skillList} />
      </Box>

      <Textarea
        ref={recommentTextareaRef}
        rows={1}
        value={recommentInput}
        onChange={onChangeTextarea}
        placeholder="답글을 입력해 주세요."
        onBlur={initRecommentTextareaRef}
      />

      <Box width="100%" padding="10px 20px" boxSizing="border-box" backgroundColor="bg1" borderRadius="0 0 6px 6px">
        <Divider color="l3" bottom={10} />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Text color="c1">{recommentInput.length}</Text>
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

export default WriteRecomment;