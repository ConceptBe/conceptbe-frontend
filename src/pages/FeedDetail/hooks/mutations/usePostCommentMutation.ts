import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';

interface CommentPayload {
  ideaId: string;
  parentId: string;
  content: string;
}

interface Props {
  feedId: string;
}

const _postComment = (payload: CommentPayload) => http.post('/comments', payload);

const usePostCommentMutation = ({ feedId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: postComment, ...rest } = useMutation({
    mutationFn: _postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', feedId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '댓글 작성에 실패했습니다.');
    },
  });

  return { postComment, ...rest };
};

export default usePostCommentMutation;
