import { Idea, Info } from '../types';

// 선택된 항목을 기반으로 카테고리(1depth)별 선택된 스킬(2depth) 수를 계산하는 함수
export const get2DepthCountsBy1Depth = (
  selectedSkillResponses: Info[],
  teamRecruitmentCategories: Idea['skillCategoryResponses'],
) => {
  // 결과를 저장할 객체
  const categoryCount: Record<string, number> = {};

  // 선택된 항목의 id 배열
  const selectedIds = selectedSkillResponses.map((item) => item.id);

  // 모든 카테고리를 순회
  teamRecruitmentCategories.forEach((category) => {
    // 현재 카테고리에 선택된 항목의 수를 세기
    const count = category.skillResponses.filter((item) => selectedIds.includes(item.id)).length;

    // 선택된 항목이 있으면 결과 객체에 추가
    if (count > 0) {
      categoryCount[category.name] = count;
    }
  });

  return categoryCount;
};
