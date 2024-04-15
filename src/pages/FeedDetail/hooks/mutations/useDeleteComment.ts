import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

interface Props {
  feedId: string;
}

const _deleteComment = (commentId: string) => http.delete(`/comments/${commentId}`);

const useDeleteCommentMutation = ({ feedId }: Props) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: deleteComment, ...rest } = useMutation({
    mutationFn: _deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', feedId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '댓글 삭제에 실패했습니다.' });
    },
  });

  return { deleteComment, ...rest };
};

export default useDeleteCommentMutation;
