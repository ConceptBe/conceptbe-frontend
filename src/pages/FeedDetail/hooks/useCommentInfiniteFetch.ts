import { MutableRefObject, useEffect } from 'react';
import { useIntersection } from 'react-use';

const useCommentInfiniteFetch = (intersectionRef: MutableRefObject<null>, fetchCallback: () => void) => {
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: `400px`,
    threshold: 0,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      fetchCallback();
    }
  }, [intersection, fetchCallback]);
};

export default useCommentInfiniteFetch;
