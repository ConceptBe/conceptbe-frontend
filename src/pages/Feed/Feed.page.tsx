import styled from '@emotion/styled';
import { Button, Header, Spacer, SVGHeaderFilter, SVGWritePencil, Text, theme } from 'concept-be-design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SEOMeta from '../../components/SEOMeta/SEOMeta';
import Logo from '../../layouts/Logo';
import { useWritingInfoQuery } from '../Write/hooks/queries/useWritingInfoQuery';
import BestIdeaCardListSection from './components/BestIdeaCardListSection/BestIdeaCardListSection';
import FilterBottomSheet from './components/FilterBottomSheet/FilterBottomSheet';
import NewIdeaCardListSection from './components/NewIdeaCardListSection/NewIdeaCardListSection';
import { getUserNickname } from './utils/getUserNickname';

const Feed = () => {
  const navigate = useNavigate();
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState(false);
  const { branches, purposes, recruitmentPlaces, cooperationWays, skillCategoryResponses } = useWritingInfoQuery();

  const closeFilterBottomSheet = () => {
    setIsFilterBottomSheetOpen(false);
  };

  const openFilterBottomSheet = () => {
    setIsFilterBottomSheetOpen(true);
  };

  return (
    <>
      <SEOMeta title="컨셉비 | 전체 피드" description="자유롭고 안전한 아이디어 공유의 장" />

      <Header main>
        <Header.Item>
          <Logo />
        </Header.Item>
        <Header.Item>
          <SVGHeaderFilter onClick={openFilterBottomSheet} cursor="pointer" />
        </Header.Item>
      </Header>

      <Wrapper>
        <FeedFixBox>
          <FeedFixTextWrapper>
            <Text font="suit22sb" color="w1">
              {getUserNickname() || 'Guest'}
            </Text>
            <Text font="suit22r" color="w1">
              님,
            </Text>
          </FeedFixTextWrapper>

          <Spacer size={8} />
          <WordBreakText font="suit22r" color="w1">
            재밌있는 아이디어가 있으신가요?
          </WordBreakText>

          <Spacer size={16} />

          <Button
            padding="0"
            css={{ width: 110, height: 34, backgroundColor: theme.color.w1 }}
            onClick={() => navigate('/write')}
          >
            <SVGWritePencil css={{ marginRight: 6 }} />
            <Text font="suit14sb" color="b2">
              글쓰러 가기
            </Text>
          </Button>
        </FeedFixBox>
        <IdeaSectionBox>
          <BestIdeaCardListSection />
          <NewIdeaCardListSection />
          <Spacer size={80} />
        </IdeaSectionBox>
      </Wrapper>
      {/* Pop Up 애니메이션이 사라짐에 따라 조건부 렌더링 로직을 제거해야할 것 같습니다. 초기화하는 로직을 직접 작성하도록 하겠습니다.*/}
      <FilterBottomSheet
        branches={branches}
        purposes={purposes}
        recruitmentPlaces={recruitmentPlaces}
        cooperationWays={cooperationWays}
        skillCategoryResponses={skillCategoryResponses}
        open={isFilterBottomSheetOpen}
        onClose={closeFilterBottomSheet}
        onApply={closeFilterBottomSheet}
      />
    </>
  );
};

export default Feed;

const Wrapper = styled.section`
  background-color: ${theme.color.c1};
  height: 100%;
`;

const FeedFixBox = styled.div`
  max-width: 315px;
  padding: 90px 30px 50px 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.c1};
  color: ${theme.color.w1};
`;

const FeedFixTextWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const IdeaSectionBox = styled.div`
  background-color: ${theme.color.bg1};
  border-radius: 16px 16px 0 0;
`;

const WordBreakText = styled(Text)`
  word-break: keep-all;
  line-height: 120%;
`;
