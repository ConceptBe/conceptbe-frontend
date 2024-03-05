import { useMutation, useQueryClient } from '@tanstack/react-query';

import { http } from '../../../../api/http';

const _postBookmarkIdea = (ideaId: number) => {
  return http.post(`/bookmark/${ideaId}`);
};

export const usePostBookmarkIdea = () => {
  const queryClient = useQueryClient();
  const { mutate: postBookmarkIdea, ...rest } = useMutation({
    mutationFn: _postBookmarkIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  return { postBookmarkIdea, ...rest };
};
