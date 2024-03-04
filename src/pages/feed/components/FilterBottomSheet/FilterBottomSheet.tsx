import styled from '@emotion/styled';
import {
  BottomSheet,
  Button,
  CheckboxContainer,
  RadioContainer,
  Spacer,
  Text,
  theme,
  useCheckbox,
  useDropdown,
  useRadio,
} from 'concept-be-design-system';

import RecruitmentPlaceSection from '../../../write/components/RecruitmentPlaceSection';
import { Idea } from '../../../write/types';
import { useFilterParams } from '../../context/filterContext';

const cooperationWays = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  branches: Idea['branches'];
  purposes: Idea['purposes'];
  recruitmentPlaces: Idea['regions'];
  skillCategoryResponses: Idea['skillCategoryResponses'];
};

const FilterBottomSheet = ({
  open,
  onClose,
  onApply,
  branches,
  purposes,
  recruitmentPlaces,
  skillCategoryResponses,
}: Props) => {
  const { filterParams, updateFilterParams, resetFilterParams } = useFilterParams();

  const branchOptions = branches.map((properties) => ({
    checked: filterParams?.branchIds?.includes(properties.id) ? true : false,
    ...properties,
  }));
  const purposeOptions = purposes.map((properties) => ({
    checked: filterParams?.purposeIds?.includes(properties.id) ? true : false,
    ...properties,
  }));
  const { checkboxValue, onChangeCheckbox } = useCheckbox({
    branches: branchOptions,
    purposes: purposeOptions,
  });

  const cooperationWayOptions =
    filterParams?.cooperationWay === undefined
      ? cooperationWays.map((properties) => {
          // 필터 선택 안 되어 있을 경우 상관없음이 기본값(id === 1)
          return properties.id === 1 ? { checked: true, ...properties } : { checked: false, ...properties };
        })
      : cooperationWays.map((properties) => ({
          checked: filterParams?.cooperationWay === properties.name ? true : false,
          ...properties,
        }));
  const { radioValue, onChangeRadio } = useRadio({
    cooperationWays: cooperationWayOptions,
  });

  const { dropdownValue, onClickDropdown } = useDropdown({
    recruitmentPlace: recruitmentPlaces.find((place) => place.id === filterParams?.recruitmentPlaceId)?.name ?? '',
  });

  const applyFilter = () => {
    const branchIds = checkboxValue.branches.filter((branch) => branch.checked).map((branch) => branch.id);
    const purposeIds = checkboxValue.purposes.filter((branch) => branch.checked).map((purpose) => purpose.id);
    const cooperationWay = radioValue.cooperationWays.find((cooperationWay) => cooperationWay.checked)?.name;
    const recruitmentPlaceId = recruitmentPlaces.find((place) => place.name === dropdownValue.recruitmentPlace)?.id;

    updateFilterParams({ branchIds, purposeIds, cooperationWay, recruitmentPlaceId });
    onApply();
  };

  const handleClose = () => {
    resetFilterParams(); // filter Context 초기화
    onClose(); // 바텀시트 닫기
  };

  return (
    <BottomSheet isOpen={open} onClose={onClose}>
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
          <Button style={{ flex: 1 }} onClick={handleClose} isGrayOut>
            닫기
          </Button>
          <Button style={{ flex: 2 }} onClick={applyFilter}>
            적용
          </Button>
        </FilterBottom>
      </FilterBox>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

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
