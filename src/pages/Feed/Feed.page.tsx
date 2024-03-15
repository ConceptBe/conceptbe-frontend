import styled from '@emotion/styled';
import { Header, Spacer, Text, theme, SVGHeaderFilter, SVGFeedWrite40 } from 'concept-be-design-system';
import { useState } from 'react';

import BestIdeaCardListSection from './components/BestIdeaCardListSection/BestIdeaCardListSection';
import FilterBottomSheet from './components/FilterBottomSheet/FilterBottomSheet';
import NewIdeaCardListSection from './components/NewIdeaCardListSection/NewIdeaCardListSection';
import { getUserNickname } from './utils/getUserNickname';
import Padding from '../../components/Padding';
import SEOMeta from '../../components/SEOMeta/SEOMeta';
import Logo from '../../layouts/Logo';
import { useWritingInfoQuery } from '../Write/hooks/queries/useWritingInfoQuery';

const Feed = () => {
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState(false);
  const { branches, purposes, recruitmentPlaces, skillCategoryResponses } = useWritingInfoQuery();

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
          <SVGFeedWrite40 />

          <Spacer size={27} />
          <FeedFixTextWrapper>
            <Text font="suit22sb" color="w1">
              {getUserNickname()}
            </Text>
            <Text font="suit22r" color="w1">
              님,
            </Text>
          </FeedFixTextWrapper>

          <Spacer size={8} />
          <Text font="suit22r" color="w1">
            재밌는 아이디어를 들려주세요!
          </Text>
          <Spacer size={14} />

          <Text font="suit15ra" color="w2">{`아이디어 적으러 가기 >`}</Text>
        </FeedFixBox>
        <IdeaSectionBox>
          <BestIdeaCardListSection />
          <NewIdeaCardListSection />
          <Padding bottom={80} />
        </IdeaSectionBox>
      </Wrapper>

      {/* `open` prop과 조건부 렌더링을 둘 다 적용하는 이유는 바텀시트에서 닫기 버튼을 눌렀을 때 선택값 초기화를 위해서입니다.
      onClose시 바텀시트를 언마운트하여 선택값을 초기화합니다. */}
      {isFilterBottomSheetOpen && (
        <FilterBottomSheet
          branches={branches}
          purposes={purposes}
          recruitmentPlaces={recruitmentPlaces}
          skillCategoryResponses={skillCategoryResponses}
          open={isFilterBottomSheetOpen}
          onClose={closeFilterBottomSheet}
          onApply={closeFilterBottomSheet}
        />
      )}
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
