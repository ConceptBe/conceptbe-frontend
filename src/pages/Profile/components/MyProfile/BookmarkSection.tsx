import styled from '@emotion/styled';
import { Box, Spacer, SVGProfileBookOpen } from 'concept-be-design-system';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import NewIdeaCard from '../../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../../Feed/hooks/useFeedInfiniteFetch';
import useNavigatePage from '../../../hooks/useNavigatePage';
import { useBookmarkedIdeasQuery } from '../../hooks/queries/useBookmarkedIdeasQuery';
import EmptyTabContentSection from '../EmptyTabContentSection';

const BookmarkSection = () => {
  const navigate = useNavigate();
  const { bookmarkedIdeas, fetchNextPage } = useBookmarkedIdeasQuery();
  const { goProfilePage } = useNavigatePage();

  const intersectionRef = useRef(null);

  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  if (bookmarkedIdeas.length === 0) {
    return (
      <EmptyTabContentSection
        svg={SVGProfileBookOpen}
        textList={['북마크한 글이 없어요.', '관심있는 아이디어를 수집해보세요.']}
        onClickSVG={() => navigate('/')}
      />
    );
  }

  return (
    <>
      {bookmarkedIdeas.map((idea) => {
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
          skillCategories: idea.skillCategories,
        };
        const footer = {
          hitsCount: idea.hitsCount,
          commentsCount: idea.commentsCount,
          likesCount: idea.likesCount,
          bookmarksCount: idea.bookmarksCount,
        };

        return (
          <Wrapper key={idea.id}>
            <NewIdeaCard id={idea.id} profile={profile} content={content} footer={footer}>
              <NewIdeaCard.Profile onClickProfile={() => goProfilePage(idea.memberResponse.id)} />
              <NewIdeaCard.Content />
              <NewIdeaCard.Footer />
            </NewIdeaCard>
            <Spacer size={20} />
          </Wrapper>
        );
      })}
      <div ref={intersectionRef}></div>
    </>
  );
};

const Wrapper = styled(Box)`
  max-width: 335px;
  margin: 0 auto;
`;

export default BookmarkSection;
