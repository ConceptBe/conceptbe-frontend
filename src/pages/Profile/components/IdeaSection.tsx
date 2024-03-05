import { Spacer } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import EmptyTabContentSection from './EmptyTabContentSection';
import NewIdeaCard from '../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../Feed/hooks/useFeedInfiniteFetch';
import { SVGMessageDotsCircle } from '../asset';
import { useMyIdeasQuery } from '../hooks/queries/useMyIdeasQuery';

const IdeaSection = () => {
  const { ideas, fetchNextPage } = useMyIdeasQuery();

  const intersectionRef = useRef(null);

  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  if (ideas.length === 0) {
    return (
      <EmptyTabContentSection
        svg={SVGMessageDotsCircle}
        textList={['작성한 글이 없어요', '재밌는 아이디어를 공유해보세요.']}
      />
    );
  }

  return (
    <>
      {ideas.map((idea, idx) => {
        const isMine = true;

        const content = {
          canEdit: isMine,
          branches: idea.branches,
          title: idea.title,
          introduce: idea.introduce,
          skillCategories: idea.skillCategories,
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
