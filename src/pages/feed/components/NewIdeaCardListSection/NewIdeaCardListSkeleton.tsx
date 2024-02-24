import { Spacer } from 'concept-be-design-system';

import { Wrapper } from './NewIdeaCardListSection';
import NewIdeaCardSkeleton from '../../../components/NewIdeaCard/NewIdeaCardSkeleton';

const NewIdeaCardListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <>
          <NewIdeaCardSkeleton key={idx} />
          <Spacer size={20} />
        </>
      ))}
    </>
  );
};

export default NewIdeaCardListSkeleton;
