import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';

const _postScrap = (id: string) => {
  return http.post<void>(`/bookmark/${id}`);
};

const usePostFeedScrap = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: postScrap, ...rest } = useMutation({
    mutationFn: _postScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '스크랩에 실패했습니다.');
    },
  });

  return { postScrap, ...rest };
};

export default usePostFeedScrap;
