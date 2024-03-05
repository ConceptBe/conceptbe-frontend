import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../api/http';
import { CommentParentResponse } from '../types';

const getComments = (feedId: string) => http.get<CommentParentResponse[]>(`/ideas/${feedId}/comments`);

const useCommentsQuery = (feedId: string) => {
  const { data: comments, ...rest } = useSuspenseQuery({
    queryKey: ['comments', feedId],
    queryFn: () => getComments(feedId),
  });

  return { comments, ...rest };
};

export default useCommentsQuery;
