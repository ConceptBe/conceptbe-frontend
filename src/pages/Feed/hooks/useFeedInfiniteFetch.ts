import { useQueryClient } from '@tanstack/react-query';
import { MutableRefObject, useEffect } from 'react';
import { useIntersection } from 'react-use';

export const useFeedInfiniteFetch = (intersectionRef: MutableRefObject<null>, fetchCallback: () => void) => {
  const queryClient = useQueryClient();
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: `0px`,
    threshold: 1,
  });

  useEffect(() => {
    const feedState = queryClient.getQueryState(['ideas']);

    if (intersection?.isIntersecting && feedState?.fetchStatus !== 'fetching') {
      fetchCallback();
    }
  }, [intersection, queryClient, fetchCallback]);
};
