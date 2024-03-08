import useDeleteCommentLike from './mutations/useDeleteCommentLike';
import usePostCommentLike from './mutations/usePostCommentLike';

interface Props {
  feedId: string;
  commentId: string;
  isLike: boolean;
}

const useToggleLikeComment = ({ feedId, commentId, isLike }: Props) => {
  const { postLikeComment } = usePostCommentLike({ feedId });
  const { deleteLikeComment } = useDeleteCommentLike({ feedId });

  const toggleLikeComment = () => {
    isLike ? deleteLikeComment(commentId) : postLikeComment(commentId);
  };

  return toggleLikeComment;
};

export default useToggleLikeComment;
