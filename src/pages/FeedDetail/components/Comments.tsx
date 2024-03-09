import { Box, Divider } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import Comment from './Comment';
import WriteComment from './WriteComment';
import { useMemberInfoQuery } from '../../Profile/hooks/queries/useMemberInfoQuery';
import useCommentsQuery from '../hooks/queries/useCommentsQuery';
import useCommentInfiniteFetch from '../hooks/useCommentInfiniteFetch';

interface Props {
  feedId: string;
}

const Comments = ({ feedId }: Props) => {
  const { comments, fetchNextPage } = useCommentsQuery(feedId);
  const { profileImageUrl: myImageUrl, nickname: myNickname, skills: mySkillList } = useMemberInfoQuery();

  const intersectionRef = useRef(null);
  useCommentInfiniteFetch(intersectionRef, fetchNextPage);

  return (
    <Box padding="20px 22px">
      <WriteComment feedId={feedId} myImageUrl={myImageUrl} myNickname={myNickname} />
      {comments.map((comment, idx) => (
        <Fragment key={comment.parentCommentId}>
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
      <div ref={intersectionRef}></div>
    </Box>
  );
};

export default Comments;
