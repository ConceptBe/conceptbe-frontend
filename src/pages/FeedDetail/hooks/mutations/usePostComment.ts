import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

interface CommentPayload {
  ideaId: string;
  parentId: string;
  content: string;
}

interface Props {
  feedId: string;
}

const _postComment = (payload: CommentPayload) => http.post('/comments', payload);

const usePostComment = ({ feedId }: Props) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: postComment, ...rest } = useMutation({
    mutationFn: _postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
      queryClient.invalidateQueries({ queryKey: ['feed', 'detail', feedId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '댓글 작성에 실패했습니다.' });
    },
  });

  return { postComment, ...rest };
};

export default usePostComment;
