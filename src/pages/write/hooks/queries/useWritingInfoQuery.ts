import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Idea } from '../../types';

const getWritingInfo = async () => {
  return http.get<Idea>('/ideas/writing');
};

export const useWritingInfoQuery = () => {
  const { data: writingInfo, ...rest } = useSuspenseQuery({ queryKey: ['writingInfo'], queryFn: getWritingInfo });

  const { branches, purposes, regions: recruitmentPlaces, skillCategoryResponses } = writingInfo;

  return {
    branches,
    purposes,
    recruitmentPlaces,
    skillCategoryResponses,
    ...rest,
  };
};
