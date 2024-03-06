import { Box } from 'concept-be-design-system';

import Comment from './Comment';
import WriteComment from './WriteComment';
import useCommentsQuery from '../hooks/queries/useCommentsQuery';

interface Props {
  feedId: string;
  imageUrl: string;
  nickname: string;
  skillList: string[];
}

const Comments = ({ feedId, imageUrl, nickname, skillList }: Props) => {
  const { comments } = useCommentsQuery(feedId);

  return (
    <Box padding="20px 22px">
      <WriteComment feedId={feedId} imageUrl={imageUrl} nickname={nickname} skillList={skillList} />
      {comments.map((comment) => (
        <Comment key={comment.content} comment={comment} />
      ))}
    </Box>
  );
};

export default Comments;
