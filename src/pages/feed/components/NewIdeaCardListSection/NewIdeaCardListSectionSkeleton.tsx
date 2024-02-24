import { Spacer } from 'concept-be-design-system';

import { Wrapper } from './NewIdeaCardListSection';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import NewIdeaCardSkeleton from '../../../components/NewIdeaCard/NewIdeaCardSkeleton';

const NewIdeaCardListSectionSkeleton = () => {
  return (
    <Wrapper>
      <Skeleton width="55%" height="22px" />
      <Spacer size={20} />
      <NewIdeaCardSkeleton />
    </Wrapper>
  );
};

export default NewIdeaCardListSectionSkeleton;
