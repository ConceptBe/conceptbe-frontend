import { useMutation } from '@tanstack/react-query';

import { http } from '../../../../api/http';

const _postBookmarkIdea = (ideaId: number) => {
  return http.post(`/bookmark/${ideaId}`);
};

export const usePostBookmarkIdea = () => {
  const { mutate: postBookmarkIdea, ...rest } = useMutation({ mutationFn: _postBookmarkIdea });

  return { postBookmarkIdea, ...rest };
};
