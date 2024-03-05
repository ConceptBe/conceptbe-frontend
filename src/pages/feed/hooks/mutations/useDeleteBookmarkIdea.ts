import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { memberId } from '../../../profile/utils/memberId';

const _deleteBookmarkIdea = (ideaId: number) => {
  return http.delete(`/bookmark/${ideaId}`);
};

export const useDeleteBookmarkIdea = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBookmarkIdea, ...rest } = useMutation({
    mutationFn: _deleteBookmarkIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.invalidateQueries({ queryKey: ['members', 'detail', memberId, 'bookmarkedIdeas'] });
    },
  });

  return { deleteBookmarkIdea, ...rest };
};
