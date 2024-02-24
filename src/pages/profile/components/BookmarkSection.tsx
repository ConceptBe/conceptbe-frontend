import { Spacer } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import NewIdeaCard from '../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../Feed/hooks/useFeedInfiniteFetch';
import { useBookmarkedIdeasQuery } from '../hooks/queries/useBookmarkedIdeasQuery';

const BookmarkSection = () => {
  const { ideas, fetchNextPage } = useBookmarkedIdeasQuery();

  const intersectionRef = useRef(null);

  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  return (
    <>
      {ideas.map((idea, idx) => {
        const isMine = false;

        const profile = {
          profileImageUrl: idea.memberResponse.profileImageUrl,
          nickname: idea.memberResponse.nickname,
          skills: idea.memberResponse.skills,
          isBookmarked: idea.isBookmarked,
          createdAt: idea.createdAt,
        };

        const content = {
          canEdit: isMine,
          branches: idea.branches,
          title: idea.title,
          introduce: idea.introduce,
          teamRecruitments: idea.teamRecruitments,
        };
        const footer = {
          hitsCount: idea.hitsCount,
          commentsCount: idea.commentsCount,
          likesCount: idea.likesCount,
          bookmarksCount: idea.bookmarksCount,
        };

        return (
          <Fragment key={idx}>
            <NewIdeaCard id={idea.id} profile={profile} content={content} footer={footer}>
              <NewIdeaCard.Profile />
              <NewIdeaCard.Content />
              <NewIdeaCard.Footer />
            </NewIdeaCard>
            <Spacer size={20} />
          </Fragment>
        );
      })}
      <div ref={intersectionRef}></div>
    </>
  );
};

export default BookmarkSection;
