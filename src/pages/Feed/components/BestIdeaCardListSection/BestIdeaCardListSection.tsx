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
      <TransparentBox />
    </Wrapper>
  );
};

export default BestIdeaCardListSection;

const TransparentBox = styled.div`
  width: 22px;
  opacity: 0;
`;

export const Wrapper = styled.div`
  padding: 47px 0 0 22px;
  max-width: 375px;
  margin-left: auto;

  @media (max-width: 420px) {
    // NewIdeaSection은 margin이 좌우 auto인 반면 BestIdeaSection은 left만 auto여서 margin-left 1/2 연산을 직접 수행
    margin-left: calc((100vw - 375px) * 0.5);
  }

  @media (max-width: 375px) {
    // BestIdeaSection은 위 미디어쿼리문으로 인해 margin이 음수값이 될 수 있으므로 0으로 일괄 지정
    margin-left: 0;
  }
`;

export const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
