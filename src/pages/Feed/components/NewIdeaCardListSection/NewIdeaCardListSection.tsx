import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';
import { Fragment, Suspense, useRef } from 'react';

import NewIdeaCardListSkeleton from './NewIdeaCardListSkeleton';
import { useDeleteIdea } from '../../../components/NewIdeaCard/hooks/mutations/useDeleteIdea';
import NewIdeaCard from '../../../components/NewIdeaCard/NewIdeaCard';
import useNavigatePage from '../../../hooks/useNavigatePage';
import { useFilterParams } from '../../context/filterContext';
import { useIdeasQuery } from '../../hooks/queries/useIdeasQuery';
import { useFeedInfiniteFetch } from '../../hooks/useFeedInfiniteFetch';
import { getUserNickname } from '../../utils/getUserNickname';

const nickname = getUserNickname();

const CardList = () => {
  const { filterParams } = useFilterParams();
  const { ideas, fetchNextPage } = useIdeasQuery(filterParams);
  const { goProfilePage } = useNavigatePage();
  const { deleteIdea } = useDeleteIdea();

  const intersectionRef = useRef(null);

  useFeedInfiniteFetch(intersectionRef, fetchNextPage);

  const handleDeleteIdea = (ideaId: number) => {
    //TODO: #54 머지 후 Confirm 컴포넌트로 대체
    if (confirm('게시글을 삭제하시겠습니까?')) deleteIdea(ideaId);
  };

  return (
    <>
      {ideas.map((idea, idx) => {
        const isMine = idea.memberResponse.nickname === nickname;

        const profile = {
          profileImageUrl: idea.memberResponse.profileImageUrl,
          nickname: idea.memberResponse.nickname,
          skills: idea.memberResponse.skills,
          isBookmarked: idea.isBookmarked,
          createdAt: idea.createdAt,
        };
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
            {isMine ? (
              <NewIdeaCard id={idea.id} content={content} footer={footer}>
                <NewIdeaCard.Content onClickDelete={() => handleDeleteIdea(idea.id)} />
                <NewIdeaCard.Footer />
              </NewIdeaCard>
            ) : (
              <NewIdeaCard id={idea.id} profile={profile} content={content} footer={footer}>
                <NewIdeaCard.Profile onClickProfile={() => goProfilePage(idea.memberResponse.id)} />
                <NewIdeaCard.Content />
                <NewIdeaCard.Footer />
              </NewIdeaCard>
            )}
            <Spacer size={20} />
          </Fragment>
        );
      })}
      <div ref={intersectionRef}></div>
    </>
  );
};

const NewIdeaCardListSection = () => {
  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        새로 올라온 아이디어
      </Text>
      <Spacer size={20} />
      <Suspense fallback={<NewIdeaCardListSkeleton />}>
        <CardList />
      </Suspense>
    </Wrapper>
  );
};

export default NewIdeaCardListSection;

export const Wrapper = styled.div`
  max-width: 331px;
  padding: 47px 22px 0 22px;
  margin: 0 auto;
`;
