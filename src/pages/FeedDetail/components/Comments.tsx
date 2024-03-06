import { Box, Divider } from 'concept-be-design-system';
import { Fragment } from 'react';

import Comment from './Comment';
import WriteComment from './WriteComment';
import { useMemberInfoQuery } from '../../profile/hooks/queries/useMemberInfoQuery';
import useCommentsQuery from '../hooks/queries/useCommentsQuery';

interface Props {
  feedId: string;
}

const Comments = ({ feedId }: Props) => {
  const { comments } = useCommentsQuery(feedId);
  const { profileImageUrl: myImageUrl, nickname: myNickname, skills: mySkillList } = useMemberInfoQuery();

  return (
    <Box padding="20px 22px">
      <WriteComment feedId={feedId} imageUrl={myImageUrl} nickname={myNickname} skillList={mySkillList} />
      {comments.map((comment, idx) => (
        <Fragment key={comment.content}>
          <Comment
            comment={comment}
            feedId={feedId}
            myImageUrl={myImageUrl}
            myNickname={myNickname}
            mySkillList={mySkillList}
          />
          {idx !== comments.length - 1 ? <Divider color="l3" /> : <></>}
        </Fragment>
      ))}
    </Box>
  );
};

export default Comments;
