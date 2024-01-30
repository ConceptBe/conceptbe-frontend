import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';

import BestIdeaCard from '../../../../components/Card/BestIdeaCard/BestIdeaCard';
import { useBestIdeasQuery } from '../../hooks/queries/useBestIdeasQuery';
import { useIntersection } from 'react-use';
import { useEffect, useRef } from 'react';

const BestIdeaCardListSection = () => {
  const {
    bestIdeas: { pages },
    fetchNextPage,
  } = useBestIdeasQuery();

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: `0px`,
    threshold: 1,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      fetchNextPage();
    }
  }, [intersection, fetchNextPage]);

  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        현재 인기 있는 아이디어
      </Text>
      <Spacer size={18} />
      <CardListWrapper>
        {pages.flat().map((bestIdea, idx) => (
          <BestIdeaCard key={idx} branches={bestIdea.branches} title={bestIdea.title} />
        ))}
        <div ref={intersectionRef}></div>
      </CardListWrapper>
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
