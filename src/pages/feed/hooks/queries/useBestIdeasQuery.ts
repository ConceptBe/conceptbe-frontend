import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { BestIdea } from '../../types';

type GetBestIdeasRequest = {
  page: number;
  size: number;
};

const getBestIdeas = ({ page, size }: GetBestIdeasRequest) => {
  return http.get<BestIdea[]>(`/ideas/best?page=${page}&size=${size}`);
};

export const useBestIdeasQuery = () => {
  const sizePerPage = 5; // 한 페이지에 보여줄 아이디어 개수
  const {
    data: bestIdeas,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['bestIdeas'],
    initialPageParam: { page: 1, size: sizePerPage },
    queryFn: ({ pageParam: { page, size } }) => {
      return getBestIdeas({ page, size });
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPageParam = { page: allPages.length + 1, size: sizePerPage };

      // 글이 0개 이거나 sizePerPage보다 작으면 마지막페이지로 간주(undefined를 반환)
      return lastPage.length === 0 || lastPage.length < sizePerPage ? undefined : nextPageParam;
    },
  });

  return { bestIdeas, fetchNextPage, hasNextPage };
};
