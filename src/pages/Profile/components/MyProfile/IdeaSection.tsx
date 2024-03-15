import styled from '@emotion/styled';
import { Box, Spacer } from 'concept-be-design-system';
import { useRef } from 'react';

import { useDeleteIdea } from '../../../components/NewIdeaCard/hooks/mutations/useDeleteIdea';
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

  const { deleteIdea } = useDeleteIdea();
  const handleDeleteIdea = (ideaId: number) => {
    //TODO: #54 머지 후 Confirm 컴포넌트로 대체
    if (confirm('게시글을 삭제하시겠습니까?')) deleteIdea(ideaId);
  };

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
      {ideas.map((idea) => {
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
          <Wrapper key={idea.id}>
            <NewIdeaCard id={idea.id} content={content} footer={footer}>
              <NewIdeaCard.Content onClickDelete={() => handleDeleteIdea(idea.id)} />
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
