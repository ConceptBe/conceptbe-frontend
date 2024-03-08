import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';

const _deleteLike = (id: string) => {
  return http.delete(`/ideas/likes/${id}`);
};

const useDeleteLikeMutation = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: deleteLike, ...rest } = useMutation({
    mutationFn: _deleteLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '좋아요 해제에 실패했습니다.');
    },
  });

  return { deleteLike, ...rest };
};

export default useDeleteLikeMutation;
