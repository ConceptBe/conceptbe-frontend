import {
  Flex,
  SVGFeedLike,
  SVGFeedMessage,
  SVGFeedScrap,
  SVGFeedUnLike,
  SVGFeedUnScrap,
  Text,
} from 'concept-be-design-system';

import { _postScrap } from '../../../api';
import { get999PlusCount } from '../../utils';
import { useFocusComment } from '../contexts/CommentFocusContext';
import useDeleteLikeMutation from '../hooks/useDeleteLikeMutation';
import useDeleteScrapMutation from '../hooks/useDeleteScrapMutation';
import usePostLikeMutation from '../hooks/usePostLikeMutation';
import usePostScrapMutation from '../hooks/usePostScrapMutation';

interface Props {
  feedId: string;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  ownerScrap: boolean;
  ownerLike: boolean;
}

const ReactionBar = ({ feedId, commentsCount, likesCount, bookmarksCount, ownerLike, ownerScrap }: Props) => {
  const { focusCommentTextarea } = useFocusComment();
  const { postScrap } = usePostScrapMutation(feedId);
  const { deleteScrap } = useDeleteScrapMutation(feedId);
  const { postLike } = usePostLikeMutation(feedId);
  const { deleteLike } = useDeleteLikeMutation(feedId);

  const toggleScrap = () => {
    ownerScrap ? deleteScrap(feedId) : postScrap(feedId);
  };

  const toggleLike = () => {
    ownerLike ? deleteLike(feedId) : postLike(feedId);
  };

  return (
    <Flex justifyContent="space-between" padding="18px 0">
      <Flex alignItems="center" cursor="pointer" gap={4} onClick={focusCommentTextarea}>
        <SVGFeedMessage />
        <Text font="suit12r" color="b9">
          댓글
        </Text>
        <Text font="suit12b" color="b9">
          {get999PlusCount(commentsCount)}
        </Text>
      </Flex>
      <Flex alignItems="center" cursor="pointer" gap={4} onClick={toggleLike}>
        {ownerLike ? <SVGFeedLike /> : <SVGFeedUnLike />}
        <Text font="suit12r" color="b9">
          좋아요
        </Text>
        <Text font="suit12b" color="b9">
          {get999PlusCount(likesCount)}
        </Text>
      </Flex>
      <Flex alignItems="center" cursor="pointer" gap={4} onClick={toggleScrap}>
        {ownerScrap ? <SVGFeedScrap /> : <SVGFeedUnScrap />}
        <Text font="suit12r" color="b9">
          스크랩
        </Text>
        <Text font="suit12b" color="b9">
          {get999PlusCount(bookmarksCount)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ReactionBar;
