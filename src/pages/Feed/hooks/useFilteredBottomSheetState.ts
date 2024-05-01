import { CooperationWay, Idea } from '../../Write/types';
import { FilterParams } from '../context/filterContext';

interface Props {
  filterParams: FilterParams | undefined;
  branches: Idea['branches'];
  purposes: Idea['purposes'];
  recruitmentPlaces: Idea['regions'];
  cooperationWays: CooperationWay[];
  skillCategoryResponses: Idea['skillCategoryResponses'];
}

const useFilteredBottomSheetState = ({
  filterParams,
  branches,
  purposes,
  recruitmentPlaces,
  cooperationWays,
  skillCategoryResponses,
}: Props) => {
  const filteredBranches = branches.map((properties) => ({
    ...properties,
    checked: filterParams?.branchIds?.includes(properties.id) ? true : false,
  }));
  const filteredPurposes = purposes.map((properties) => ({
    ...properties,
    checked: filterParams?.purposeIds?.includes(properties.id) ? true : false,
  }));

  const filteredCooperationWays =
    filterParams?.cooperationWay === undefined
      ? cooperationWays
      : cooperationWays.map((properties) => ({
          ...properties,
          checked: filterParams?.cooperationWay === properties.name ? true : false,
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
    const skillCategory2Depth = skillCategoryResponses
      .find((item) => item.skillResponses.find((skill) => skill.id === id))
      ?.skillResponses.find((skill) => skill.id === id)?.name;

    if (skillCategory2Depth === undefined) {
      throw new Error('2depth skill category not found');
    }

    return skillCategory2Depth;
  };

  const filteredRecruitmentPlace =
    recruitmentPlaces.find((place) => place.id === filterParams?.recruitmentPlaceId)?.name ?? '';
  const filteredSkillCategory1Depth =
    filterParams?.skillCategoryIds?.[0] !== undefined
      ? getSkillCategory1DepthFrom2DepthSkillId(filterParams?.skillCategoryIds?.[0]).name
      : undefined ?? '';
  const filteredSkillCategory2Depth =
    filterParams?.skillCategoryIds?.[0] !== undefined
      ? get2DepthNameFrom2DepthId(filterParams?.skillCategoryIds?.[0])
      : undefined ?? '';

  return {
    filteredBranches,
    filteredPurposes,
    filteredCooperationWays,
    filteredRecruitmentPlace,
    filteredSkillCategory1Depth,
    filteredSkillCategory2Depth,
  };
};

export default useFilteredBottomSheetState;
