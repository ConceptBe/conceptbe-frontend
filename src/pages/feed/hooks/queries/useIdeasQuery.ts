import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Idea } from '../../types';

type GetIdeasRequest = {
  page: number;
  size: number;
};

const getIdeas = ({ page, size }: GetIdeasRequest) => {
  return http.get<Idea[]>(`/ideas?page=${page}&size=${size}`);
};

export const useIdeasQuery = () => {
  const sizePerPage = 5; // 한 페이지에 보여줄 아이디어 개수
  const {
    data: ideas,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['ideas'],
    initialPageParam: { page: 1, size: sizePerPage },
    queryFn: ({ pageParam: { page, size } }) => {
      return getIdeas({ page, size });
    },
    select: (idea) => ({ ...idea, createdAt: new Date() }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPageParam = { page: allPages.length + 1, size: sizePerPage };

      // 글이 0개 이거나 sizePerPage보다 작으면 마지막페이지로 간주(undefined를 반환)
      return lastPage.length === 0 || lastPage.length < sizePerPage ? undefined : nextPageParam;
    },
  });

  return { ideas, fetchNextPage, hasNextPage };
};
