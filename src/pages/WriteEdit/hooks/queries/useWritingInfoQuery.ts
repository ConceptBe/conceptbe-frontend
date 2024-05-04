import { useSuspenseQuery } from '@tanstack/react-query';

import { useIdeaDetailQuery } from './useIdeaDetailQuery';
import { http } from '../../../../api/http';
import { Idea } from '../../types';

const cooperations = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

const getWritingInfo = async () => {
  return http.get<Idea>('/ideas/writing');
};

export const useWritingEditInfoQuery = (ideaId: number) => {
  const { ideaDetail } = useIdeaDetailQuery(ideaId);
  const { data: writingInfo, ...rest } = useSuspenseQuery({
    queryKey: ['writingInfo'],
    queryFn: getWritingInfo,
    select: (data) => {
      const branches = data.branches.map((properties) =>
        ideaDetail.branchList.includes(properties.name)
          ? { checked: true, ...properties }
          : { checked: false, ...properties },
      );
      const purposes = data.purposes.map((properties) =>
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

  const { branches, purposes, regions: recruitmentPlaces, cooperationWays, skillCategoryResponses } = writingInfo;

  return { ideaDetail, branches, purposes, recruitmentPlaces, cooperationWays, skillCategoryResponses, ...rest };
};
