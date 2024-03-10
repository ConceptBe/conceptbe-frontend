import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Idea } from '../../types';

type GetMyIdeasRequest = {
  page: number;
  size: number;
  userId: number;
};

const getIdeas = ({ page, size, userId }: GetMyIdeasRequest) => {
  return http.get<Idea[]>(`/members/${userId}/ideas?page=${page}&size=${size}`);
};

export const useIdeasQuery = (userId: number) => {
  const sizePerPage = 20; // 한 페이지에 보여줄 아이디어 개수
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['members', 'detail', userId, 'ideas'],
    initialPageParam: { page: 0, size: sizePerPage },
    queryFn: ({ pageParam: { page, size } }) => {
      return getIdeas({ page, size, userId });
    },

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPageParam = { page: lastPageParam.page + 1, size: sizePerPage };

      // 글이 0개 이거나 sizePerPage보다 작으면 마지막페이지로 간주(undefined를 반환)
      return lastPage.length === 0 || lastPage.length < sizePerPage ? undefined : nextPageParam;
    },
  });

  return { ideas: data.pages.flat(), fetchNextPage, hasNextPage };
};
