import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';

const _postLike = (id: string) => {
  return http.post(`/ideas/likes/${id}`);
};

const usePostFeedLike = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: postLike, ...rest } = useMutation({
    mutationFn: _postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '좋아요에 실패했습니다.');
    },
  });

  return { postLike, ...rest };
};

export default usePostFeedLike;
