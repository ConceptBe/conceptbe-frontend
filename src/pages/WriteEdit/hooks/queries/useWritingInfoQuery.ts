import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { WrappedBranchInfo, WrappedSkillInfo } from '../../../Write/types';
import { Info } from '../../types';
import { useIdeaDetailQuery } from './useIdeaDetailQuery';

type Idea = {
  purposesResponses: Info[];
  regionsResponses: Info[];
  branchesResponses: WrappedBranchInfo[];
  skillCategoryResponses: WrappedSkillInfo[];
};

const cooperations = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

const getWritingInfo = async () => {
  return http.get<Idea>('/writing');
};

export const useWritingEditInfoQuery = (ideaId: number) => {
  const { ideaDetail } = useIdeaDetailQuery(ideaId);
  const { data: writingInfo, ...rest } = useSuspenseQuery({
    queryKey: ['writingInfo'],
    queryFn: getWritingInfo,
    select: (data) => {
      const branches = data.branchesResponses.map((properties) =>
        ideaDetail.branchList.includes(properties.name)
          ? { checked: true, ...properties }
          : { checked: false, ...properties },
      );
      const purposes = data.purposesResponses.map((properties) =>
        ideaDetail.purposeList.includes(properties.name)
          ? { checked: true, ...properties }
          : { checked: false, ...properties },
      );
      const cooperationWays = cooperations.map((properties) => {
        // 협업방식: 상관없음이 기본값(id === 1)
        return properties.name === ideaDetail.cooperationWay
          ? { checked: true, ...properties }
          : { checked: false, ...properties };
      });
      return {
        ...data,
        branches,
        purposes,
        cooperationWays,
      };
    },
  });

  const { branchesResponses, purposesResponses, regionsResponses, cooperationWays, skillCategoryResponses } =
    writingInfo;

  return {
    ideaDetail,
    branchesResponses,
    purposesResponses,
    recruitmentPlaces: regionsResponses,
    cooperationWays,
    skillCategoryResponses,
    ...rest,
  };
};
