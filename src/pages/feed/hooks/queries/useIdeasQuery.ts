import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Idea } from '../../types';

import type { FilterParams } from '../../context/filterContext';

type GetIdeasRequest = {
  page: number;
  size: number;
  filterParams?: FilterParams;
};

const getIdeas = ({ page, size, filterParams }: GetIdeasRequest) => {
  const searchParams = new URLSearchParams({ page: String(page), size: String(size) });

  if (filterParams) {
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key as keyof FilterParams];

      if (Array.isArray(value) && value.length > 0) {
        searchParams.append(key, value.join(','));
      }
      if (typeof value === 'string' || typeof value === 'number') {
        searchParams.append(key, String(value));
      }
    });
  }

  return http.get<Idea[]>(`/ideas?${searchParams.toString()}`);
};

export const useIdeasQuery = (filterParams: GetIdeasRequest['filterParams']) => {
  const sizePerPage = 20; // 한 페이지에 보여줄 아이디어 개수
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['ideas', filterParams],
    initialPageParam: { page: 0, size: sizePerPage },
    queryFn: ({ pageParam: { page, size } }) => {
      return getIdeas({ page, size, filterParams });
    },

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPageParam = { page: lastPageParam.page + 1, size: sizePerPage };

      // 글이 0개 이거나 sizePerPage보다 작으면 마지막페이지로 간주(undefined를 반환)
      return lastPage.length === 0 || lastPage.length < sizePerPage ? undefined : nextPageParam;
    },
  });

  return { ideas: data.pages.flat(), fetchNextPage, hasNextPage };
};
