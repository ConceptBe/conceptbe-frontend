import { MutableRefObject, useEffect } from 'react';
import { useIntersection } from 'react-use';

const useCommentInfiniteFetch = (intersectionRef: MutableRefObject<null>, fetchCallback: () => void) => {
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: `0px`,
    threshold: 1,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      fetchCallback();
    }
  }, [intersection, fetchCallback]);
};

export default useCommentInfiniteFetch;
