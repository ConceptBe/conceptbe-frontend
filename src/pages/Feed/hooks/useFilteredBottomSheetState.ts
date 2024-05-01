import { useCheckbox, useDropdown, useRadio } from 'concept-be-design-system';

import { Idea } from '../../Write/types';
import { FilterParams } from '../context/filterContext';

interface Props {
  filterParams: FilterParams | undefined;
  branches: Idea['branches'];
  purposes: Idea['purposes'];
  recruitmentPlaces: Idea['regions'];
  skillCategoryResponses: Idea['skillCategoryResponses'];
}

const cooperationWays = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

const useFilteredBottomSheetState = ({
  filterParams,
  branches,
  purposes,
  recruitmentPlaces,
  skillCategoryResponses,
}: Props) => {
  const branchOptions = branches.map((properties) => ({
    checked: filterParams?.branchIds?.includes(properties.id) ? true : false,
    ...properties,
  }));
  const purposeOptions = purposes.map((properties) => ({
    checked: filterParams?.purposeIds?.includes(properties.id) ? true : false,
    ...properties,
  }));

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

  const getSkillCategory1DepthFrom2DepthSkillId = (id: number) => {
    const skillCategory1Depth = skillCategoryResponses.find((item) =>
      item.skillResponses.find((skill) => skill.id === id),
    );

    if (skillCategory1Depth === undefined) {
      throw new Error('skillCategory1Depth skill category not found');
    }
    return skillCategory1Depth;
  };

  const get2DepthNameFrom2DepthId = (id: number) => {
    const name = skillCategoryResponses
      .find((item) => item.skillResponses.find((skill) => skill.id === id))
      ?.skillResponses.find((skill) => skill.id === id)?.name;

    if (name === undefined) {
      throw new Error('2depth skill category not found');
    }

    return name;
  };

  const { checkboxValue, selectedCheckboxId, onChangeCheckbox, onResetCheckbox } = useCheckbox({
    branches: branchOptions,
    purposes: purposeOptions,
  });
  const { radioValue, selectedRadioName, onChangeRadio, onResetRadio } = useRadio({
    cooperationWays: cooperationWayOptions,
  });
  const { dropdownValue, onClickDropdown, onResetDropdown } = useDropdown({
    recruitmentPlace: recruitmentPlaces.find((place) => place.id === filterParams?.recruitmentPlaceId)?.name ?? '',
    skillCategory1Depth:
      filterParams?.skillCategoryIds?.[0] !== undefined
        ? getSkillCategory1DepthFrom2DepthSkillId(filterParams?.skillCategoryIds?.[0]).name
        : undefined ?? '',
    skillCategory2Depth:
      filterParams?.skillCategoryIds?.[0] !== undefined
        ? get2DepthNameFrom2DepthId(filterParams?.skillCategoryIds?.[0])
        : undefined ?? '',
  });

  const skillCategory1DepthItems = skillCategoryResponses.map((item) => ({ id: item.id, name: item.name }));
  const skillCategory2DepthItems = skillCategoryResponses.find(
    (item) => item.name === dropdownValue.skillCategory1Depth,
  )?.skillResponses;

  return {
    checkboxValue,
    selectedCheckboxId,
    onChangeCheckbox,
    onResetCheckbox,
    radioValue,
    selectedRadioName,
    onChangeRadio,
    onResetRadio,
    dropdownValue,
    onClickDropdown,
    onResetDropdown,
    skillCategory1DepthItems,
    skillCategory2DepthItems,
  };
};

export default useFilteredBottomSheetState;
