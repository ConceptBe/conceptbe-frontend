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
import { useWritingInfoQuery } from '../../../write/hooks/queries/useWritingInfoQuery';
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
};

const FilterBottomSheet = ({ open, onClose, onApply }: Props) => {
  const { filterParams, updateFilterParams } = useFilterParams();
  const { branches, purposes, recruitmentPlaces, skillCategoryResponses } = useWritingInfoQuery();

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
    onApply();

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
          <Button style={{ flex: 1 }} onClick={onClose} isGrayOut>
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
