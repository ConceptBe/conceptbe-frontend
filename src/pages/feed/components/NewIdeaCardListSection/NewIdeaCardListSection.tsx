import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';
import { Fragment, useEffect, useRef } from 'react';

import NewIdeaCard from '../../../../components/Card/NewIdeaCard/NewIdeaCard';
import { useIdeasQuery } from '../../hooks/queries/useIdeasQuery';
import { useIntersection } from 'react-use';

const NewIdeaCardListSection = () => {
  const {
    ideas: { pages },
    fetchNextPage,
  } = useIdeasQuery();

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
        피드 영역 타이틀입니다
      </Text>
      <Spacer size={20} />
      {pages.flat().map((idea, idx) => (
        <Fragment key={idx}>
          <NewIdeaCard key={idx} idea={idea} />
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
