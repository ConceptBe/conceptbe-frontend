import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import { useIdeasQuery } from '../../hooks/queries/useIdeasQuery';
import { useFeedInfiniteFetch } from '../../hooks/useFeedInfiniteFetch';
import NewIdeaCard from '../NewIdeaCard/NewIdeaCard';

const NewIdeaCardListSection = () => {
  const { ideas, fetchNextPage } = useIdeasQuery();

  const intersectionRef = useRef(null);
  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        새로 올라온 아이디어
      </Text>
      <Spacer size={20} />
      {ideas.map((idea, idx) => (
        <Fragment key={idx}>
          <NewIdeaCard
            id={idea.id}
            profile={{
              nickname: idea.memberResponse.nickname,
              skills: idea.memberResponse.skills,
              isBookmarked: idea.isBookmarked,
              createdAt: idea.createdAt,
            }}
            content={{
              branches: idea.branches,
              title: idea.title,
              introduce: idea.introduce,
              teamRecruitments: idea.teamRecruitments,
            }}
            footer={{
              hitsCount: idea.hitsCount,
              commentsCount: idea.commentsCount,
              likesCount: idea.likesCount,
              bookmarksCount: idea.bookmarksCount,
            }}
          >
            <NewIdeaCard.Profile />
            <NewIdeaCard.Content />
            <NewIdeaCard.Footer />
          </NewIdeaCard>
          <Spacer size={20} />
        </Fragment>
      ))}
      <div ref={intersectionRef}></div>
    </Wrapper>
  );
};

export default NewIdeaCardListSection;

export const Wrapper = styled.div`
  padding: 47px 22px 0 22px;
`;
