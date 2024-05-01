import styled from '@emotion/styled';
import { Skeleton } from 'concept-be-design-system';

import { BestIdeaCardWrapper } from './BestIdeaCard';

const BestIdeaCardSkeleton = () => {
  return (
    <Wrapper>
      <Skeleton width="140px" height="180px" />
    </Wrapper>
  );
};

export default BestIdeaCardSkeleton;

const Wrapper = styled(BestIdeaCardWrapper)`
  background-color: inherit;
  cursor: inherit;
`;
