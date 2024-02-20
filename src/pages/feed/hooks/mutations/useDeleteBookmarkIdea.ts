import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../api/http';

const _deleteBookmarkIdea = (ideaId: number) => {
  return http.delete(`/bookmark/${ideaId}`);
};

export const useDeleteBookmarkIdea = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBookmarkIdea, ...rest } = useMutation({
    mutationFn: _deleteBookmarkIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  return { deleteBookmarkIdea, ...rest };
};
