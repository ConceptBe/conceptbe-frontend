import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../../api/http';

const _deleteIdea = (ideaId: number) => {
  return http.delete(`/ideas/${ideaId}`);
};

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteIdea, ...rest } = useMutation({
    mutationFn: _deleteIdea,
    onSuccess: (data, variables) => {
      const ideaId = variables;

      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.invalidateQueries({ queryKey: ['members', 'detail', ideaId, 'bookmarkedIdeas'] });
    },
  });

  return { deleteIdea, ...rest };
};
