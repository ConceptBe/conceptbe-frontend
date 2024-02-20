import { Flex, SVGFeedLike, SVGFeedMessage, SVGFeedUnScrap, Text } from 'concept-be-design-system';

import { _postScrap } from '../../../api';
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
  const { postScrap } = usePostScrapMutation(feedId);
  const { deleteScrap } = useDeleteScrapMutation(feedId);
  const { postLike } = usePostLikeMutation(feedId);

  const toggleScrap = () => {
    ownerScrap ? deleteScrap(feedId) : postScrap(feedId);
  };

  return (
    <Flex justifyContent="space-between" padding="18px 0">
      <Flex alignItems="center" gap={4}>
        <SVGFeedMessage />
        <Text font="suit12r" color="b9">
          댓글
        </Text>
        <Text font="suit12b" color="b9">
          {commentsCount > 999 ? '999+' : commentsCount}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={4}>
        <SVGFeedLike />
        <Text font="suit12r" color="b9">
          좋아요
        </Text>
        <Text font="suit12b" color="b9">
          {likesCount > 999 ? '999+' : likesCount}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={4} cursor="pointer" onClick={toggleScrap}>
        <SVGFeedUnScrap />
        <Text font="suit12r" color="b9">
          스크랩
        </Text>
        <Text font="suit12b" color="b9">
          {bookmarksCount > 999 ? '999+' : bookmarksCount}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ReactionBar;
