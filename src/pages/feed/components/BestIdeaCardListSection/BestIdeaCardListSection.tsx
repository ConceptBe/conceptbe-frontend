import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';
import { Suspense, useRef } from 'react';

import BestIdeaCardListSkeleton from './BestIdeaCardListSkeleton';
import { useBestIdeasQuery } from '../../hooks/queries/useBestIdeasQuery';
import { useFeedInfiniteFetch } from '../../hooks/useFeedInfiniteFetch';
import BestIdeaCard from '../BestIdeaCard/BestIdeaCard';

const CardList = () => {
  const { bestIdeas, fetchNextPage } = useBestIdeasQuery();

  const intersectionRef = useRef(null);
  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  return (
    <CardListWrapper>
      {bestIdeas.map((bestIdea, idx) => (
        <BestIdeaCard key={idx} id={bestIdea.id} branches={bestIdea.branches} title={bestIdea.title} idx={idx} />
      ))}
      <div ref={intersectionRef}></div>
    </CardListWrapper>
  );
};

const BestIdeaCardListSection = () => {
  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        현재 인기 있는 아이디어
      </Text>
      <Spacer size={18} />
      <Suspense fallback={<BestIdeaCardListSkeleton />}>
        <CardList />
      </Suspense>
    </Wrapper>
  );
};

export default BestIdeaCardListSection;

export const Wrapper = styled.div`
  padding: 47px 0 0 22px;
`;

export const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;
