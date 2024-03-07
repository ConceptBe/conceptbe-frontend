import { useEffect } from 'react';

import { useFocusRecommentTextareaContext } from '../contexts/CommentFocusContext';

interface Props {
  focusCondition: boolean;
}

const useFocusRecomment = ({ focusCondition }: Props) => {
  const { focusRecommentTextarea, initRecommentTextarea } = useFocusRecommentTextareaContext();

  useEffect(() => {
    if (!focusCondition) {
      initRecommentTextarea();
      return;
    }

    focusRecommentTextarea();
  }, [focusCondition, focusRecommentTextarea, initRecommentTextarea]);
};

export default useFocusRecomment;
