import { Spacer } from 'concept-be-design-system';
import { Fragment } from 'react';

import NewIdeaCardSkeleton from '../../../components/NewIdeaCard/NewIdeaCardSkeleton';

const NewIdeaCardListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Fragment key={idx}>
          <NewIdeaCardSkeleton />
          <Spacer size={20} />
        </Fragment>
      ))}
    </>
  );
};

export default NewIdeaCardListSkeleton;
