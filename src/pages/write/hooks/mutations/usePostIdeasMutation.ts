import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { PostIdeasRequest } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const _postIdeas = (ideas: PostIdeasRequest) => {
  return http.post('/ideas', ideas, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });
};

// TODO: 제대로 된 에러핸들링 추가(토스트 추가 등)
type PostIdeaError = AxiosError<{ message: string }>;

export const usePostIdeasMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: postIdeas, ...rest } = useMutation({
    mutationFn: _postIdeas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      navigate('/');
    },
    onError: (error: PostIdeaError) => {
      alert(error.response?.data.message ?? '글 작성에 실패했습니다.');
    },
  });

  return { postIdeas, ...rest };
};
