import { Spacer } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import EmptyTabContentSection from './EmptyTabContentSection';
import NewIdeaCard from '../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../Feed/hooks/useFeedInfiniteFetch';
import { SVGBookOpen } from '../asset';
import { useBookmarkedIdeasQuery } from '../hooks/queries/useBookmarkedIdeasQuery';

const BookmarkSection = () => {
  const { bookmarkedIdeas, fetchNextPage } = useBookmarkedIdeasQuery();

  const intersectionRef = useRef(null);

  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  if (bookmarkedIdeas.length === 0) {
    return (
      <EmptyTabContentSection
        svg={SVGBookOpen}
        textList={['북마크한 글이 없어요.', '관심있는 아이디어를 수집해보세요.']}
      />
    );
  }

  return (
    <>
      {bookmarkedIdeas.map((idea, idx) => {
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
