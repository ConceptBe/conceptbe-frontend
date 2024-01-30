import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { BestIdea } from '../../types';

const getBestIdeas = async () => {
  return http.get<BestIdea[]>('/ideas/best?page=1&size=10');
};

export const useBestIdeasQuery = () => {
  const { data: bestIdeas, ...rest } = useSuspenseQuery({ queryKey: ['bestIdeas'], queryFn: getBestIdeas });

  return { bestIdeas, ...rest };
};
