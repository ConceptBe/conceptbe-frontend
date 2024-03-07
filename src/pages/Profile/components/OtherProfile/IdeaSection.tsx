import { Spacer } from 'concept-be-design-system';
import { Fragment, useRef } from 'react';

import NewIdeaCard from '../../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../../Feed/hooks/useFeedInfiniteFetch';
import { SVGMessageDotsCircle } from '../../asset';
import { useIdeasQuery } from '../../hooks/queries/useIdeasQuery';
import EmptyTabContentSection from '../EmptyTabContentSection';

type Props = {
  userId: number;
};

const IdeaSection = ({ userId }: Props) => {
  const { ideas, fetchNextPage } = useIdeasQuery(userId);

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
        const isMine = false;

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