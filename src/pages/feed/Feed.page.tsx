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
  SVGHeaderFilter,
  SVGFeedWrite40,
  useDropdown,
} from 'concept-be-design-system';
import { useState } from 'react';

import Padding from '../../components/Padding';
import Logo from '../../layouts/Logo';
import { filterOptions, filterSubOptions, filterRadio } from '../../modules/constants';
import { useIdeasQuery } from '../../hooks/queries/useIdeasQuery';
import { useBestIdeasQuery } from '../../hooks/queries/useBestIdeasQuery';
import PopularIdeaCard from '../../components/Card/PopularIdeaCard';
import NewIdeaCard from '../../components/Card/NewIdeaCard';

interface RadioValue {
  collaboration: Option[];
}

interface CheckboxValue {
  field: Option[];
  goal: Option[];
}

interface Option {
  id: number;
  name: string;
  checked: boolean;
}

//드롭다운
const dropdownItems = [
  { id: 1, name: 'Dropdown item1 asdasddas' },
  { id: 2, name: 'Dropdown item2' },
];

const Feed = () => {
  const { bestIdeas } = useBestIdeasQuery();
  const { ideas } = useIdeasQuery();
  const [isFilter, setIsFilter] = useState(false);
  const { checkboxValue, onChangeCheckbox } = useCheckbox<CheckboxValue>({
    field: filterOptions,
    goal: filterSubOptions,
  });
  const { radioValue, onChangeRadio } = useRadio<RadioValue>({
    collaboration: filterRadio,
  });
  const { dropdownValue, onClickDropdown } = useDropdown({
    temp1: '',
    temp2: '',
    temp3: '',
  });

  if (!ideas || !bestIdeas) {
    return null;
  }

  return (
    <>
      <Header main>
        <Header.Item>
          <Logo />
        </Header.Item>
        <Header.Item>
          <SVGHeaderFilter onClick={() => setIsFilter(true)} cursor="pointer" />
        </Header.Item>
      </Header>

      <Wrapper>
        <FeedFixBox>
          <SVGFeedWrite40 />

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
              {bestIdeas.map((bestIdea, idx) => (
                <PopularIdeaCard key={idx} branch={bestIdea.branches} title={bestIdea.title} />
              ))}
            </FeedFixWrapper>
          </FeedWrapper>

          <FeedWrapper style={{ padding: '47px 22px 0 22px' }}>
            <Text font="suit16sb" color="b4">
              피드 영역 타이틀입니다
            </Text>
            <Spacer size={20} />
            {ideas.map((idea, idx) => (
              <>
                <NewIdeaCard key={idx} idea={idea} />
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
              <CheckboxContainer
                label="분야"
                checkboxKey="field"
                options={checkboxValue.field}
                onChange={onChangeCheckbox}
              />
            </FilterWrapper>

            <FilterWrapper>
              <CheckboxContainer
                label="목적"
                checkboxKey="goal"
                options={checkboxValue.goal}
                onChange={onChangeCheckbox}
              />
            </FilterWrapper>

            <FilterWrapper>
              <RadioContainer
                label="협업 방식"
                radioKey="collaboration"
                options={radioValue.collaboration}
                onChange={onChangeRadio}
                gap="large"
              />
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                지역
              </Text>
              <Spacer size={12} />
              <Dropdown selectedValue={dropdownValue.temp1} initialValue="임시">
                {dropdownItems.map(({ id, name }) => (
                  <Dropdown.Item
                    key={id}
                    value={name}
                    onClick={(value) => {
                      onClickDropdown(value, 'temp1');
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                팀원 모집
              </Text>
              <Spacer size={12} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Dropdown selectedValue={dropdownValue.temp2} initialValue="임시">
                  {dropdownItems.map(({ id, name }) => (
                    <Dropdown.Item
                      key={id}
                      value={name}
                      onClick={(value) => {
                        onClickDropdown(value, 'temp2');
                      }}
                    >
                      {name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <Dropdown selectedValue={dropdownValue.temp3} initialValue="임시">
                  {dropdownItems.map(({ id, name }) => (
                    <Dropdown.Item
                      key={id}
                      value={name}
                      onClick={(value) => {
                        onClickDropdown(value, 'temp3');
                      }}
                    >
                      {name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </FilterWrapper>
          </FilterContent>
          <FilterBottom>
            <Button style={{ flex: 1 }} onClick={() => setIsFilter(false)} isGrayOut>
              닫기
            </Button>
            <Button style={{ flex: 2 }} onClick={() => {}}>
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
