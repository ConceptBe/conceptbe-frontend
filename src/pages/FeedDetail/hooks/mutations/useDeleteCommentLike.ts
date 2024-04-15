import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

const _deleteLikeComment = (commentId: string) => {
  return http.delete(`/comments/likes/${commentId}`);
};

const useDeleteCommentLike = ({ feedId }: { feedId: string }) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: deleteLikeComment, ...rest } = useMutation({
    mutationFn: _deleteLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '좋아요 해제에 실패했습니다.' });
    },
  });

  return { deleteLikeComment, ...rest };
};

export default useDeleteCommentLike;
