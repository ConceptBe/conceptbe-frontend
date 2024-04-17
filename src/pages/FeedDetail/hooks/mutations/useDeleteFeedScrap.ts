import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

const _deleteScrap = (id: string) => {
  return http.delete<void>(`/bookmark/${id}`);
};

const useDeleteFeedScrap = (id: string) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: deleteScrap, ...rest } = useMutation({
    mutationFn: _deleteScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '스크랩 해제에 실패했습니다.' });
    },
  });

  return { deleteScrap, ...rest };
};

export default useDeleteFeedScrap;
