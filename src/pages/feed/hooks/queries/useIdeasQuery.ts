import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Idea } from '../../types';

const getIdeas = async () => {
  return http.get<Idea[]>('/ideas?page=1&size=10');
};

export const useIdeasQuery = () => {
  const { data: ideas, ...rest } = useSuspenseQuery({
    queryKey: ['ideas'],
    queryFn: getIdeas,
    select: (bestIdeas) => bestIdeas.map((bestIdea) => ({ ...bestIdea, createdAt: new Date() })),
  });

  return { ideas, ...rest };
};
