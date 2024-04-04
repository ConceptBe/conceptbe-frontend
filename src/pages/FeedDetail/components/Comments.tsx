import { Box, Divider, SVGProfileMessageDots } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import Comment from './Comment';
import WriteComment from './WriteComment';
import EmptyTabContentSection from '../../Profile/components/EmptyTabContentSection';
import { useMemberInfoQuery } from '../../Profile/hooks/queries/useMemberInfoQuery';
import { getUserId } from '../../Profile/utils/getUserId';
import useCommentsQuery from '../hooks/queries/useCommentsQuery';
import useCommentInfiniteFetch from '../hooks/useCommentInfiniteFetch';

interface Props {
  feedId: string;
}

const Comments = ({ feedId }: Props) => {
  const { comments, fetchNextPage } = useCommentsQuery(feedId);
  const { profileImageUrl: myImageUrl, nickname: myNickname, skills: mySkillList } = useMemberInfoQuery(getUserId());

  const intersectionRef = useRef(null);
  useCommentInfiniteFetch(intersectionRef, fetchNextPage);

  return (
    <Box padding="20px 22px">
      <WriteComment feedId={feedId} myImageUrl={myImageUrl} myNickname={myNickname} />
      {comments.length > 0 ? (
        comments.map((comment, idx) => (
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
        ))
      ) : (
        <>
          <div ref={intersectionRef}></div>
          <EmptyTabContentSection svg={SVGProfileMessageDots} textList={['', '아직 작성된 댓글이 없어요.']} />
        </>
      )}
      {/* 무한 스크롤이 간헐적으로 되지 않는 문제 때문에 생긴 중복 분기 처리 로직입니다. 문제 해결시 리팩토링 예정 */}
      {comments.length > 0 && <div ref={intersectionRef}></div>}
    </Box>
  );
};

export default Comments;
