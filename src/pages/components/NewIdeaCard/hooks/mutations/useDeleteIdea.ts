import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../../api/http';
import { getUserId } from '../../../../Profile/utils/getUserId';

const _deleteIdea = (ideaId: number) => {
  return http.delete(`/ideas/${ideaId}`);
};

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteIdea, ...rest } = useMutation({
    mutationFn: _deleteIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      queryClient.invalidateQueries({ queryKey: ['members', 'detail', `${getUserId()}`, 'ideas'] });
    },
  });

  return { deleteIdea, ...rest };
};
