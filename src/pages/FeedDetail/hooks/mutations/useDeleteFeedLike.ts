import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

const _deleteLike = (id: string) => {
  return http.delete(`/ideas/likes/${id}`);
};

const useDeleteFeedLike = (id: string) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: deleteLike, ...rest } = useMutation({
    mutationFn: _deleteLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '좋아요 해제에 실패했습니다.' });
    },
  });

  return { deleteLike, ...rest };
};

export default useDeleteFeedLike;
