import styled from '@emotion/styled';
import { Box, Spacer, theme } from 'concept-be-design-system';

import Comment from './Comment';
import useCommentsQuery from '../hooks/useCommentsQuery';

interface Props {
  feedId: string;
}

const Comments = ({ feedId }: Props) => {
  const { comments } = useCommentsQuery(feedId);

  return (
    <Box padding="20px 22px">
      <Box position="relative">
        <Input placeholder="댓글을 입력해 주세요." />
      </Box>
      <Spacer size={20} />
      {comments.map((comment) => (
        <Comment key={comment.content} comment={comment} />
      ))}
    </Box>
  );
};

export default Comments;

const Input = styled.input`
  border-radius: 6px;
  width: 100%;
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
