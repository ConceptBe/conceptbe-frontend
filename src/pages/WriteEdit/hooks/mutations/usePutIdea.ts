import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';
import { PutIdeasRequest } from '../../types';

const _putIdea = ({ ideaId, idea }: PutIdeasRequest) => {
  return http.put(`/ideas/${ideaId}`, idea, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// TODO: 제대로 된 에러핸들링 추가(토스트 추가 등)
type PutIdeaError = AxiosError<{ message: string }>;

export const usePutIdea = () => {
  const openAlert = useAlert();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: putIdea, ...rest } = useMutation({
    mutationFn: _putIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      navigate(-1);
    },
    onError: (error: PutIdeaError) => {
      openAlert({ content: error.response?.data.message ?? '글 수정에 실패했습니다.' });
    },
  });

  return { putIdea, ...rest };
};
