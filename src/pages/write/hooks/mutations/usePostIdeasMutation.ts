import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { PostIdeasRequest } from '../../types';
import { useNavigate } from 'react-router-dom';

const _postIdeas = (ideas: PostIdeasRequest) => {
  return http.post('/ideas', ideas, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
};

export const usePostIdeasMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: postIdeas, ...rest } = useMutation({
    mutationFn: _postIdeas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      navigate('/');
    },
  });

  return { postIdeas, ...rest };
};
