import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { PostIdeasRequest } from '../../types';

const _postIdeas = (ideas: PostIdeasRequest) => {
  return http.post('/ideas', ideas);
};

export const usePostIdeasMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: postIdeas, ...rest } = useMutation({
    mutationFn: _postIdeas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  return { postIdeas, ...rest };
};
