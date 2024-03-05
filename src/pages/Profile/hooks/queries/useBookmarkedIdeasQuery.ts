import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { BookmarkedIdea } from './../../types/index';
import { http } from '../../../../api/http';
import { memberId } from '../../utils/memberId';

type GetBookMarkedIdeasRequest = {
  page: number;
  size: number;
};

const getBookmarkedIdeas = ({ page, size }: GetBookMarkedIdeasRequest) => {
  return http.get<BookmarkedIdea[]>(`/members/${memberId}/bookmarks?page=${page}&size=${size}`);
};

export const useBookmarkedIdeasQuery = () => {
  const sizePerPage = 20; // 한 페이지에 보여줄 아이디어 개수
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['members', 'detail', memberId, 'bookmarkedIdeas'],
    initialPageParam: { page: 0, size: sizePerPage },
    queryFn: ({ pageParam: { page, size } }) => getBookmarkedIdeas({ page, size }),

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPageParam = { page: lastPageParam.page + 1, size: sizePerPage };

      // 글이 0개 이거나 sizePerPage보다 작으면 마지막페이지로 간주(undefined를 반환)
      return lastPage.length === 0 || lastPage.length < sizePerPage ? undefined : nextPageParam;
    },
  });

  return { bookmarkedIdeas: data.pages.flat(), fetchNextPage, hasNextPage };
};
