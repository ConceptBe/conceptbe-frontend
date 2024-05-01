import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

interface CommentPayload {
  content: string;
}

interface Props {
  feedId: string;
  commentId: string;
}

const _editComment = (commentId: string, payload: CommentPayload) => http.patch(`/comments/${commentId}`, payload);

const usePatchComment = ({ feedId, commentId }: Props) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: editComment, ...rest } = useMutation({
    mutationFn: (payload: CommentPayload) => _editComment(commentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '댓글 수정에 실패했습니다.' });
    },
  });

  return { editComment, ...rest };
};

export default usePatchComment;
