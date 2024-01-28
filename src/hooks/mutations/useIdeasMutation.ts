import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../api/http';

type PostIdeasRequest = {
  title: string; // 제목
  introduce: string; // 소개
  cooperationWay: string; // 협업 방식
  recruitmentPlaceId: number; // 팀원 모집 지역
  branchIds: number[]; // 분야
  purposeIds: number[]; // 목적
  teamRecruitmentIds: number[]; // 팀원 모집 종류
};

const _postIdeas = (ideas: PostIdeasRequest) => {
  return http.post('/ideas', ideas);
};

export const usePostIdeasMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: postIdeas, ...rest } = useMutation({
    mutationFn: _postIdeas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  return { postIdeas, ...rest };
};
