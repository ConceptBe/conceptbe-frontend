import styled from '@emotion/styled';
import { Box, Spacer, SVGProfileMessageDots } from 'concept-be-design-system';
import { useRef } from 'react';

import NewIdeaCard from '../../../components/NewIdeaCard/NewIdeaCard';
import { useFeedInfiniteFetch } from '../../../Feed/hooks/useFeedInfiniteFetch';
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
    return <EmptyTabContentSection svg={SVGProfileMessageDots} textList={['', '아직 작성한 글이 없어요.']} />;
  }

  return (
    <>
      {ideas.map((idea) => {
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
          <Wrapper key={idea.id}>
            <NewIdeaCard id={idea.id} content={content} footer={footer}>
              <NewIdeaCard.Content />
              <NewIdeaCard.Footer />
            </NewIdeaCard>
            <Spacer size={20} />
          </Wrapper>
        );
      })}
      <div ref={intersectionRef}></div>
    </>
  );
};

const Wrapper = styled(Box)`
  max-width: 335px;
  margin: 0 auto;
`;

export default IdeaSection;
