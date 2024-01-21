import styled from '@emotion/styled';

import { BestIdeaCardWrapper } from './BestIdeaCard';
import Skeleton from '../Skeleton/Skeleton';

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
