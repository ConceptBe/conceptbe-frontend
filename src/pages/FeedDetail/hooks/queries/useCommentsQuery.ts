import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { CommentParentResponse } from '../../types';

interface GetCommentsProps {
  page: number;
  size: number;
}

const getComments = (feedId: string, { page, size }: GetCommentsProps) =>
  http.get<CommentParentResponse[]>(`/ideas/${feedId}/comments?page=${page}&size=${size}`);

const useCommentsQuery = (feedId: string) => {
  const sizePerPage = 10;
  const { data, fetchNextPage, ...rest } = useSuspenseInfiniteQuery({
    queryKey: ['comments', feedId],
    initialPageParam: { page: 0, size: sizePerPage },
    queryFn: ({ pageParam }) => getComments(feedId, pageParam),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPageParam = { page: lastPageParam.page + 1, size: sizePerPage };

      const commentsCount = allPages.reduce(
        (acc, commentParents) =>
          acc +
          commentParents.reduce(
            (acc, { commentChildResponses }) => acc + commentChildResponses.length,
            commentParents.length,
          ),
        0,
      );

      return commentsCount < sizePerPage * (lastPageParam.page + 1) ? undefined : nextPageParam;
    },
  });

  return { comments: data.pages.flat(), fetchNextPage, ...rest };
};

export default useCommentsQuery;
