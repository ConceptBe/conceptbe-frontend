import { Badge, Divider, Header, Spacer, Text, TextDivider, Flex, Box } from 'concept-be-design-system';
import { useNavigate, useParams } from 'react-router-dom';

import Comments from './components/Comments';
import ModifyDropdown from './components/ModifyDropdown';
import ReactionBar from './components/ReactionBar';
import { CommentFocusProvider } from './contexts/CommentFocusContext';
import useFeedDetailQuery from './hooks/queries/useFeedDetailQuery';
import ProfileInfo from '../../components/ProfileInfo';
import Back from '../../layouts/Back';
import Logo from '../../layouts/Logo';
import { formatCommentDate } from '../Feed/utils/formatCommentDate';

const FeedDetailPage = () => {
  const navigator = useNavigate();
  const { id: feedId } = useParams() as { id: string };
  const {
    imageUrl,
    nickname,
    skillList,
    title,
    date,
    introduce,
    branchList,
    purposeList,
    cooperationWay,
    recruitmentPlace,
    skillCategories,
    likesCount,
    commentsCount,
    bookmarksCount,
    hits,
    owner,
    ownerScrap,
    ownerLike,
  } = useFeedDetailQuery(feedId);

  const onModifyFeedDetail = () => {
    // 게시글 수정 로직 필요
  };

  const onDeleteFeedDetail = () => {
    // 게시글 삭제 로직 필요
    navigator(-1);
  };

  return (
    <CommentFocusProvider>
      <Header main>
        <Back />
        <Logo />
        <ModifyDropdown owner={owner} onModify={onModifyFeedDetail} onDelete={onDeleteFeedDetail} />
      </Header>

      <Box padding="30px 22px 30px 22px" marginTop={48}>
        <ProfileInfo imageUrl={imageUrl} nickname={nickname} skillList={skillList} />
        <Spacer size={20} />
        <Box>
          <div>
            <Text font="suit14sm" color="c1">
              {branchList.join(' / ')}
            </Text>
            <Spacer size={8} />
            <Text font="suit18sb" color="b4">
              {title}
            </Text>
            <Spacer size={8} />
            <Flex alignItems="center">
              <Text font="suit12r" color="b9">
                {formatCommentDate(date)}
              </Text>
              <TextDivider left={6} right={6} color="l2" />
              <Text font="suit12r" color="b9">
                조회수 {hits > 999 ? '999+' : hits}
              </Text>
            </Flex>
          </div>
        </Box>
        <Divider color="l3" top={16} bottom={16} />
        <Text font="suit15ra" color="b6" style={{ lineHeight: '24px', whiteSpace: 'pre-wrap' }}>
          {introduce}
        </Text>
      </Box>

      <Divider color="bg1" height={8} />

      <Box padding="30px 22px 0 22px">
        <Box>
          <Text font="suit14m" color="b9">
            분야
          </Text>
          <Spacer size={12} />
          <Flex wrap="wrap" gap={6}>
            {branchList.map((badge) => (
              <Badge key={badge} fontColor="b4">
                {badge}
              </Badge>
            ))}
          </Flex>
        </Box>
        <Spacer size={30} />
        <Box>
          <Text font="suit14m" color="b9">
            목적
          </Text>
          <Spacer size={12} />
          <Flex wrap="wrap" gap={6}>
            {purposeList.map((badge) => (
              <Badge key={badge} fontColor="b4">
                {badge}
              </Badge>
            ))}
          </Flex>
        </Box>
        <Spacer size={30} />
        <Flex gap={12}>
          <Text font="suit14m" color="b9">
            협업 방식
          </Text>
          <Text font="suit14m" color="b4">
            {cooperationWay}
          </Text>
        </Flex>
        <Spacer size={30} />
        <Flex gap={12}>
          <Text font="suit14m" color="b9">
            모집 지역
          </Text>
          <Text font="suit14m" color="b4">
            {recruitmentPlace}
          </Text>
        </Flex>
        <Spacer size={30} />
        <Box>
          <Text font="suit14m" color="b9">
            팀원 모집
          </Text>
          <Spacer size={12} />
          <Flex wrap="wrap" gap={6}>
            {skillCategories.map((badge) => (
              <Badge key={badge} fontColor="b4">
                {badge}
              </Badge>
            ))}
          </Flex>
        </Box>

        <Spacer size={35} />
        <Divider color="l3" />

        <ReactionBar
          feedId={feedId}
          commentsCount={commentsCount}
          likesCount={likesCount}
          bookmarksCount={bookmarksCount}
          ownerScrap={ownerScrap}
          ownerLike={ownerLike}
        />
      </Box>

      <Divider color="bg1" height={8} />

      <Comments feedId={feedId} />
    </CommentFocusProvider>
  );
};

export default FeedDetailPage;
