import styled from '@emotion/styled';
import { Badge, Box, Divider, Flex, Header, Spacer, Text, TextDivider } from 'concept-be-design-system';
import { useNavigate, useParams } from 'react-router-dom';

import SEOMeta from '../../components/SEOMeta/SEOMeta';
import useConfirm from '../../hooks/useConfirm';
import Back from '../../layouts/Back';
import Logo from '../../layouts/Logo';
import { formatCommentDate } from '../Feed/utils/formatCommentDate';
import HyperLinkText from '../components/HyperLinkText/HyperLinkText';
import { useDeleteIdea } from '../components/NewIdeaCard/hooks/mutations/useDeleteIdea';
import Comments from './components/Comments';
import IdeaImageList from './components/IdeaImageList';
import ModifyDropdown from './components/ModifyDropdown';
import ProfileInfo from './components/ProfileInfo';
import ReactionBar from './components/ReactionBar';
import { CommentFocusProvider } from './contexts/CommentFocusContext';
import useFeedDetailQuery from './hooks/queries/useFeedDetailQuery';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const { id: feedId } = useParams() as { id: string };
  const {
    memberId,
    imageUrl,
    nickname,
    mainSkill,
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
    imageResponses,
  } = useFeedDetailQuery(feedId);
  const openConfirm = useConfirm();
  const { deleteIdea } = useDeleteIdea();

  const onModifyFeedDetail = () => {
    navigate('/write-edit', { state: { ideaId: feedId } });
  };

  const onDeleteFeedDetail = async () => {
    if (await openConfirm({ content: '게시글을 삭제하시겠습니까?' })) {
      // feedId === ideaId
      deleteIdea(Number(feedId));
      navigate(-1);
    }
  };

  return (
    <CommentFocusProvider>
      <SEOMeta title="컨셉비 | 글 상세" description={title} />

      <Header main>
        <Back />
        <Logo />
        <ModifyDropdown owner={owner} onEdit={onModifyFeedDetail} onDelete={onDeleteFeedDetail} />
      </Header>

      <Box padding="30px 22px 30px 22px" marginTop={48}>
        <ProfileInfo memberId={memberId} imageUrl={imageUrl} nickname={nickname} mainSkill={mainSkill} owner={owner} />
        <Spacer size={20} />
        <Box>
          <div>
            <Text font="suit14sm" color="c1">
              {branchList.join(' / ')}
            </Text>
            <Spacer size={8} />
            <LineHeightText font="suit18sb" color="b4">
              {title}
            </LineHeightText>
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
        <HyperLinkText font="suit15ra" color="b6" lineHeight="24px">
          {introduce}
        </HyperLinkText>
      </Box>

      <Divider color="bg1" height={8} />

      {imageResponses.length > 0 && (
        <>
          <Divider color="l3" />
          <Spacer size={22} />
          <IdeaImageList imageResponses={imageResponses} />
          <Spacer size={22} />
        </>
      )}

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

const LineHeightText = styled(Text)`
  line-height: 20px;
`;
