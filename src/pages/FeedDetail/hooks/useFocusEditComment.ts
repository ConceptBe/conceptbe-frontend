import { useEffect } from 'react';

import { useFocusEditCommentTextareaContext } from '../contexts/CommentFocusContext';

interface Props {
  focusCondition: boolean;
}

const useFocusEditComment = ({ focusCondition }: Props) => {
  const { focusEditCommentTextarea, initEditCommentTextarea } = useFocusEditCommentTextareaContext();

  useEffect(() => {
    if (!focusCondition) {
      initEditCommentTextarea();
      return;
    }

    focusEditCommentTextarea();
  }, [focusCondition, focusEditCommentTextarea, initEditCommentTextarea]);
};

export default useFocusEditComment;
