import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';

interface CommentPayload {
  ideaId: number;
  parentId: number;
  content: string;
}

interface Props {
  feedId: string;
  onSuccess?: () => void;
}

const _postComment = (payload: CommentPayload) => http.post('/comments', payload);

const usePostCommentMutation = ({ feedId, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: postComment, ...rest } = useMutation({
    mutationFn: _postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '댓글 작성에 실패했습니다.');
    },
  });

  return { postComment, ...rest };
};

export default usePostCommentMutation;
