import styled from '@emotion/styled';
import {
  useCheckbox,
  useRadio,
  BottomSheet,
  Button,
  CheckboxContainer,
  Dropdown,
  Header,
  RadioContainer,
  Spacer,
  Text,
  theme,
  SVGFilter,
  SVGWrite40,
  PNGIdeaBackground1,
  PNGIdeaBackground2,
  PNGIdeaBackground3,
  PNGIdeaBackground4,
  PNGIdeaBackground5,
} from 'concept-be-design-system';
import { useState } from 'react';

import IdeaCard from '../../components/Card/IdeaCard';
import PopCard from '../../components/Card/PopCard';
import Padding from '../../components/Padding';
import Logo from '../../layouts/Logo';
import { filterOptions, filterSubOptions, filterRadio } from '../../modules/constants';

// 아이디어
const ideas = [
  { id: 1, image: PNGIdeaBackground1, title: '제목입니다. 제목입니다. 제목입니다.', category: 'IT' },
  { id: 2, image: PNGIdeaBackground2, title: '제목입니다. 제목입니다. 제목입니다.', category: '디자인' },
  { id: 3, image: PNGIdeaBackground3, title: '제목입니다. 제목입니다. 제목입니다.', category: '기획' },
  { id: 4, image: PNGIdeaBackground4, title: '제목입니다. 제목입니다. 제목입니다.', category: '영상' },
  { id: 5, image: PNGIdeaBackground5, title: '제목입니다. 제목입니다. 제목입니다.', category: '개발' },
  { id: 6, image: PNGIdeaBackground1, title: '제목입니다. 제목입니다. 제목입니다.', category: '기획' },
];

//태그
const tags = ['팀원모집', '팀원모집', '팀원모집', '팀원모집'];

//드롭다운
const dropdownItems = [
  { value: '1', text: 'Dropdown item1 asdasddas' },
  { value: '2', text: 'Dropdown item2' },
];

const Feed = () => {
  const [isFilter, setIsFilter] = useState(false);
  const { checkboxValue, onChangeCheckBox } = useCheckbox({
    field: filterOptions,
    goal: filterSubOptions,
  });
  const { radioValue, onChangeRadio } = useRadio({
    collaboration: filterRadio,
  });

  const handleDropdownClick = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Header main>
        <Header.Item>
          <Logo />
        </Header.Item>
        <Header.Item>
          <SVGFilter onClick={() => setIsFilter(true)} cursor="pointer" />
        </Header.Item>
      </Header>

      <Wrapper>
        <FeedFixBox>
          <SVGWrite40 />

          <Spacer size={27} />
          <FeedFixTextWrapper>
            <Text font="suit22sb" color="w1">
              일이삼사오육칠팔구십
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

        <FeedBox>
          <FeedWrapper style={{ padding: '47px 0 0 22px' }}>
            <Text font="suit16sb" color="b4">
              현재 인기 있는 아이디어
            </Text>
            <Spacer size={18} />
            <FeedFixWrapper>
              {ideas.map((idea, idx) => {
                return <PopCard key={idx} image={idea.image} category={idea.category} title={idea.title} />;
              })}
            </FeedFixWrapper>
          </FeedWrapper>

          <FeedWrapper style={{ padding: '47px 22px 0 22px' }}>
            <Text font="suit16sb" color="b4">
              피드 영역 타이틀입니다
            </Text>
            <Spacer size={20} />
            {Array.from({ length: 20 }, (_, idx) => (
              <>
                <IdeaCard key={idx} badges={tags} />
                <Spacer size={20} />
              </>
            ))}
          </FeedWrapper>
          <Padding bottom={80} />
        </FeedBox>
      </Wrapper>

      <BottomSheet isOpen={isFilter} onClose={() => setIsFilter(false)}>
        <FilterBox>
          <FilterContent>
            <FilterWrapper>
              <Text font="suit15m" color="b9">
                분야
              </Text>
              <Spacer size={12} />
              <CheckboxContainer
                nameKey="field"
                options={checkboxValue.field}
                onChange={(e) => onChangeCheckBox(e, 'field')}
              />
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                목적
              </Text>
              <Spacer size={12} />
              <CheckboxContainer
                nameKey="goal"
                options={checkboxValue.goal}
                onChange={(e) => onChangeCheckBox(e, 'goal')}
              />
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                협업 방식
              </Text>
              <Spacer size={12} />
              <RadioContainer
                nameKey="collaboration"
                options={radioValue.collaboration}
                onChange={(e) => onChangeRadio(e, 'collaboration')}
                gap="large"
              />
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                지역
              </Text>
              <Spacer size={12} />
              <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue="다운" />
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                팀원 모집
              </Text>
              <Spacer size={12} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue="다운" />
                <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue="다운" />
              </div>
            </FilterWrapper>
          </FilterContent>
          <FilterBottom>
            <Button customStyle={{ flex: 1 }} onClick={() => setIsFilter(false)} isGrayOut>
              닫기
            </Button>
            <Button customStyle={{ flex: 2 }} onClick={() => {}}>
              적용
            </Button>
          </FilterBottom>
        </FilterBox>
      </BottomSheet>
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

const FeedFixWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const FeedFixTextWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const FeedBox = styled.div`
  background-color: ${theme.color.bg1};
  border-radius: 16px 16px 0 0;
`;

const FeedWrapper = styled.div`
  padding-top: 47px;
`;

const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 22px;
`;

const FilterBottom = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 7px;
  position: sticky;
  bottom: 0;
  padding: 0 22px 22px;
  background-color: ${theme.color.w1};
`;

const FilterWrapper = styled.div``;

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
