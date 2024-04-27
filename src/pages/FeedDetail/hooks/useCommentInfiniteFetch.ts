import { useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useEffect } from 'react';
import { useIntersection } from 'react-use';

const useCommentInfiniteFetch = (
  intersectionRef: MutableRefObject<HTMLDivElement | null>,
  fetchCallback: () => void,
  feedId: string,
) => {
  const queryClient = useQueryClient();
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    const commentState = queryClient.getQueryState(['comments', feedId]);

    if (intersection?.isIntersecting && commentState?.fetchStatus !== 'fetching') {
      fetchCallback();
    }
  }, [intersection, queryClient, feedId, fetchCallback]);
};

export default useCommentInfiniteFetch;
