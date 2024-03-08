import useDeleteLikeComment from './mutations/useDeleteLikeComment';
import usePostLikeComment from './mutations/usePostLikeComment';

interface Props {
  feedId: string;
  commentId: string;
  isLike: boolean;
}

const useToggleLikeComment = ({ feedId, commentId, isLike }: Props) => {
  const { postLikeComment } = usePostLikeComment({ feedId });
  const { deleteLikeComment } = useDeleteLikeComment({ feedId });

  const toggleLikeComment = () => {
    isLike ? deleteLikeComment(commentId) : postLikeComment(commentId);
  };

  return toggleLikeComment;
};

export default useToggleLikeComment;
