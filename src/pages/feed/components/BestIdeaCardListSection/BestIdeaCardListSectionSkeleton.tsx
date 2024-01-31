import { Spacer } from 'concept-be-design-system';

import { CardListWrapper, Wrapper } from './BestIdeaCardListSection';
import BestIdeaCardSkeleton from '../BestIdeaCard/BestIdeaCardSkeleton';
import Skeleton from '../../../../components/Skeleton/Skeleton';

const BestIdeaCardListSectionSkeleton = () => {
  return (
    <Wrapper>
      <Skeleton width="45%" height="22px" />
      <Spacer size={18} />
      <CardListWrapper>
        {Array.from({ length: 5 }).map((_, idx) => (
          <BestIdeaCardSkeleton key={idx} />
        ))}
      </CardListWrapper>
    </Wrapper>
  );
};

export default BestIdeaCardListSectionSkeleton;
