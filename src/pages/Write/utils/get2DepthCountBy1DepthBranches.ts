import { Idea, Info } from '../types';

// 선택된 항목을 기반으로 카테고리(1depth)별 선택된 스킬(2depth) 수를 계산하는 함수
export const get2DepthCountsBy1DepthBranches = (
  selectedSkillResponses: Info[],
  teamRecruitmentCategories: Idea['branchesResponses'],
) => {
  const categoryCount: Record<string, number> = {};
  const selectedIds = selectedSkillResponses.map((item) => item.id);

  // 모든 카테고리를 순회
  teamRecruitmentCategories.forEach((category) => {
    const count = category.branchResponses.filter((item) => selectedIds.includes(item.id)).length;

    if (count > 0) {
      categoryCount[category.name] = count;
    }
  });

  return categoryCount;
};
