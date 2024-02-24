import { Spacer } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import NewIdeaCard from '../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../Feed/hooks/useFeedInfiniteFetch';
import { useMyIdeasQuery } from '../hooks/queries/useMyIdeasQuery';

const IdeaSection = () => {
  const { ideas, fetchNextPage } = useMyIdeasQuery();

  const intersectionRef = useRef(null);

  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  return (
    <>
      {ideas.map((idea, idx) => {
        const isMine = true;

        const content = {
          canEdit: isMine,
          branches: idea.branches,
          title: idea.title,
          introduce: idea.introduce,
          teamRecruitments: idea.teamRecruitments,
        };
        const footer = {
          hitsCount: idea.hitsCount,
          commentsCount: idea.commentsCount,
          likesCount: idea.likesCount,
          bookmarksCount: idea.bookmarksCount,
        };

        return (
          <Fragment key={idx}>
            <NewIdeaCard id={idea.id} content={content} footer={footer}>
              <NewIdeaCard.Content />
              <NewIdeaCard.Footer />
            </NewIdeaCard>
            <Spacer size={20} />
          </Fragment>
        );
      })}
      <div ref={intersectionRef}></div>
    </>
  );
};

export default IdeaSection;
