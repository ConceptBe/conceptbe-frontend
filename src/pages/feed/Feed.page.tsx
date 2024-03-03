import styled from '@emotion/styled';
import { Header, Spacer, Text, theme, SVGHeaderFilter, SVGFeedWrite40 } from 'concept-be-design-system';
import { useState } from 'react';

import BestIdeaCardListSection from './components/BestIdeaCardListSection/BestIdeaCardListSection';
import FilterBottomSheet from './components/FilterBottomSheet/FilterBottomSheet';
import NewIdeaCardListSection from './components/NewIdeaCardListSection/NewIdeaCardListSection';
import { getUserNickname } from './utils/getUserNickname';
import Padding from '../../components/Padding';
import Logo from '../../layouts/Logo';

const Feed = () => {
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState(false);

  const closeFilterBottomSheet = () => {
    setIsFilterBottomSheetOpen(false);
  };

  const openFilterBottomSheet = () => {
    setIsFilterBottomSheetOpen(true);
  };

  return (
    <>
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

      <FilterBottomSheet
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
  padding: 90px 30px 50px 30px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.c1};
  color: ${theme.color.w1};
`;

const FeedWrapper = styled.div`
  padding-top: 47px;
`;

const FeedFixTextWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const IdeaSectionBox = styled.div`
  background-color: ${theme.color.bg1};
  border-radius: 16px 16px 0 0;
`;
