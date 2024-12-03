import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Idea } from '../../types';

const COOPERATIONS = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

export const COOPERATION_OPTIONS = COOPERATIONS.map((properties) =>
  properties.id === 1 ? { checked: true, ...properties } : { checked: false, ...properties },
);

const getWritingInfo = async () => {
  return http.get<Idea>('/writing');
};

export const useWritingInfoQuery = () => {
  const { data: writingInfo, ...rest } = useSuspenseQuery({
    queryKey: ['writingInfo'],
    queryFn: getWritingInfo,
    select: (data) => {
      const purposes = data.purposesResponses.map((properties) => ({ checked: false, ...properties }));
      const cooperationWays = COOPERATION_OPTIONS;

      return {
        ...data,
        purposes,
        cooperationWays,
      };
    },
  });

  const { branchesResponses, purposesResponses, regionsResponses, cooperationWays, skillCategoryResponses } =
    writingInfo;

  return {
    branches: branchesResponses,
    purposes: purposesResponses,
    recruitmentPlaces: regionsResponses,
    cooperationWays,
    skillCategoryResponses,
    ...rest,
  };
};
