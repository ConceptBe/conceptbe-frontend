import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useAlert from '../../../../hooks/useAlert';

const _postLikeComment = (commentId: string) => http.post(`/comments/likes/${commentId}`);

const usePostCommentLike = ({ feedId }: { feedId: string }) => {
  const openAlert = useAlert();
  const queryClient = useQueryClient();
  const { mutate: postLikeComment, ...rest } = useMutation({
    mutationFn: _postLikeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '좋아요에 실패했습니다.' });
    },
  });

  return { postLikeComment, ...rest };
};

export default usePostCommentLike;
