import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { _deleteScrap } from '../../../../api';

const useDeleteScrapMutation = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: deleteScrap, ...rest } = useMutation({
    mutationFn: _deleteScrap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedDetail', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '스크랩 해제에 실패했습니다.');
    },
  });

  return { deleteScrap, ...rest };
};

export default useDeleteScrapMutation;
