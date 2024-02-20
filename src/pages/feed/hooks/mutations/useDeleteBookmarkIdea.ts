import { useMutation } from '@tanstack/react-query';

import { http } from '../../../../api/http';

const _deleteBookmarkIdea = (ideaId: number) => {
  return http.delete(`/bookmark/${ideaId}`);
};

export const useDeleteBookmarkIdea = () => {
  const { mutate: deleteBookmarkIdea, ...rest } = useMutation({ mutationFn: _deleteBookmarkIdea });

  return { deleteBookmarkIdea, ...rest };
};
