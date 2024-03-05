import { CardListWrapper } from './BestIdeaCardListSection';
import BestIdeaCardSkeleton from '../BestIdeaCard/BestIdeaCardSkeleton';

const BestIdeaCardListSkeleton = () => {
  return (
    <CardListWrapper>
      {Array.from({ length: 5 }).map((_, idx) => (
        <BestIdeaCardSkeleton key={idx} />
      ))}
    </CardListWrapper>
  );
};

export default BestIdeaCardListSkeleton;
