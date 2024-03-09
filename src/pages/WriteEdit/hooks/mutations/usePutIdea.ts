import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { http } from '../../../../api/http';

import type { PutIdeaRequest } from '../../types';

const _putIdea = ({ ideaId, idea }: { ideaId: number; idea: PutIdeaRequest }) => {
  return http.put(`/ideas/${ideaId}`, idea);
};

// TODO: 제대로 된 에러핸들링 추가(토스트 추가 등)
type PutIdeaError = AxiosError<{ message: string }>;

export const usePutIdea = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: putIdea, ...rest } = useMutation({
    mutationFn: _putIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      navigate('/');
    },
    onError: (error: PutIdeaError) => {
      alert(error.response?.data.message ?? '글 수정에 실패했습니다.');
    },
  });

  return { putIdea, ...rest };
};
