import { useSuspenseQuery } from '@tanstack/react-query';

import { IdeaDetail } from './../../types/index';
import { http } from '../../../../api/http';

const getIdeaDetail = async (ideaId: number) => {
  return http.get<IdeaDetail>(`/ideas/${ideaId}`);
};

export const useIdeaDetailQuery = (ideaId: number) => {
  const { data: ideaDetail, ...rest } = useSuspenseQuery({
    queryKey: ['ideas', 'detail', ideaId],
    queryFn: () => getIdeaDetail(ideaId),
  });

  return {
    ideaDetail,
    ...rest,
  };
};
