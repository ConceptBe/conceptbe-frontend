import { Flex, SVGFeedLike, SVGFeedMessage, SVGFeedUnScrap, Text } from 'concept-be-design-system';

import useScrapMutation from '../hooks/useScrapMutation';

interface Props {
  feedId: string;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
}

const ReactionBar = ({ feedId, commentsCount, likesCount, bookmarksCount }: Props) => {
  const { postScrap } = useScrapMutation(feedId);

  const toggleScrap = () => {
    postScrap(feedId);
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
