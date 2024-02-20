import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { _postLike } from '../../../api';

const usePostLikeMutation = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: postLike, ...rest } = useMutation({
    mutationFn: _postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedDetail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '좋아요에 실패했습니다.');
    },
  });

  return { postLike, ...rest };
};

export default usePostLikeMutation;
