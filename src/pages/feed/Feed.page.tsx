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

import BestIdeaCardListSection from './components/BestIdeaCardListSection/BestIdeaCardListSection';
import NewIdeaCardListSection from './components/NewIdeaCardListSection/NewIdeaCardListSection';
import { useFilterParams } from './context/filterContext';
import { getUserNickname } from './utils/getUserNickname';
import Padding from '../../components/Padding';
import Logo from '../../layouts/Logo';
import RecruitmentPlaceSection from '../write/components/RecruitmentPlaceSection';
import { useWritingInfoQuery } from '../write/hooks/queries/useWritingInfoQuery';

const cooperationWays = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

const Feed = () => {
  const [isFilter, setIsFilter] = useState(false);
  const { updateFilterParams } = useFilterParams();

  const { branches, purposes, recruitmentPlaces, skillCategories } = useWritingInfoQuery();

  const branchOptions = branches.map((properties) => ({ checked: false, ...properties }));
  const purposeOptions = purposes.map((properties) => ({ checked: false, ...properties }));
  const { checkboxValue, onChangeCheckbox } = useCheckbox({
    branches: branchOptions,
    purposes: purposeOptions,
  });

  const cooperationWayOptions = cooperationWays.map((properties) => ({ checked: false, ...properties }));
  const { radioValue, onChangeRadio } = useRadio({
    cooperationWays: cooperationWayOptions,
  });

  const { dropdownValue, onClickDropdown } = useDropdown({
    recruitmentPlace: '',
  });

  const applyFilter = () => {
    const branchIds = checkboxValue.branches.filter((branch) => branch.checked).map((branch) => branch.id);
    const purposeIds = checkboxValue.purposes.filter((branch) => branch.checked).map((purpose) => purpose.id);
    const cooperationWay = radioValue.cooperationWays.find((cooperationWay) => cooperationWay.checked)?.name;
    const recruitmentPlaceId = recruitmentPlaces.find((place) => place.name === dropdownValue.recruitmentPlace)?.id;

    updateFilterParams({ branchIds, purposeIds, cooperationWay, recruitmentPlaceId });
    setIsFilter(false);

    console.log(
      'branchIds',
      branchIds,
      'purposeIds',
      purposeIds,
      'cooperationWay',
      cooperationWay,
      'recruitmentPlaceId',
      recruitmentPlaceId,
    );
  };

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

      <BottomSheet isOpen={isFilter} onClose={() => setIsFilter(false)}>
        <FilterBox>
          <FilterContent>
            <FilterWrapper>
              <CheckboxContainer
                label="분야"
                checkboxKey="branches"
                options={checkboxValue.branches}
                onChange={onChangeCheckbox}
              />
            </FilterWrapper>

            <FilterWrapper>
              <CheckboxContainer
                label="목적"
                checkboxKey="purposes"
                options={checkboxValue.purposes}
                onChange={onChangeCheckbox}
              />
            </FilterWrapper>

            <FilterWrapper>
              <RadioContainer
                label="협업방식"
                radioKey="cooperationWays"
                options={radioValue.cooperationWays}
                onChange={(e) => onChangeRadio(e, 'cooperationWays')}
                gap="large"
              />
            </FilterWrapper>

            <FilterWrapper>
              <RecruitmentPlaceSection
                places={recruitmentPlaces}
                selectedPlace={dropdownValue.recruitmentPlace}
                onPlaceChange={(selectedPlace) => onClickDropdown(selectedPlace, 'recruitmentPlace')}
              />
            </FilterWrapper>

            <FilterWrapper>
              <Text font="suit15m" color="b9">
                팀원 모집
              </Text>
              <Spacer size={12} />
              <div style={{ display: 'flex', gap: 8 }}>
                {/* <Dropdown selectedValue={dropdownValue.temp2} initialValue="임시">
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
                </Dropdown> */}
              </div>
            </FilterWrapper>
          </FilterContent>
          <FilterBottom>
            <Button style={{ flex: 1 }} onClick={() => setIsFilter(false)} isGrayOut>
              닫기
            </Button>
            <Button style={{ flex: 2 }} onClick={applyFilter}>
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
