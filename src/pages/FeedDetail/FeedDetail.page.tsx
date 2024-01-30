import styled from '@emotion/styled';
import {
  Badge,
  Divider,
  Header,
  Spacer,
  Text,
  TextDivider,
  theme,
  SVGTripleDots,
  SVGFeedLike,
  SVGFeedMessage,
  SVGFeedPencil,
  SVGFeedUnScrap,
  SVGCancel,
  Flex,
  Box,
} from 'concept-be-design-system';
import { useParams } from 'react-router-dom';

import Comments from './components/Comments';
import useGetFeedDetail from './hooks/useGetFeedDetail';
import useHandleClickOutside from './hooks/useHandleClickOutside';
import ProfileInfo from '../../components/ProfileInfo';
import Back from '../../layouts/Back';
import Logo from '../../layouts/Logo';

const FeedDetailPage = () => {
  const { id: feedId } = useParams();
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
    teamRecruitmentsList,
    likesCount,
    commentsCount,
    bookmarksCount,
    hits,
    commentParentResponses,
  } = useGetFeedDetail(feedId);

  const { dropdownRef, isOpenModifyDropdown, toggleModifyDropdown } = useHandleClickOutside();

  return (
    <>
      <Header main>
        <Back />
        <Logo />
        <Box position="relative" ref={dropdownRef} cursor="pointer">
          <SVGTripleDots onClick={toggleModifyDropdown} />
          {isOpenModifyDropdown && (
            <DropDownBox>
              <Flex justifyContent="space-between" alignItems="center">
                <Text font="suit12r" color="b6">
                  수정하기
                </Text>
                <SVGFeedPencil />
              </Flex>
              <Divider color="bg1" height={0.1} />
              <Flex justifyContent="space-between" alignItems="center">
                <Text font="suit12r" color="b6">
                  삭제하기
                </Text>
                <SVGCancel />
              </Flex>
            </DropDownBox>
          )}
        </Box>
      </Header>
      <Box padding="30px 22px 30px 22px" marginTop={48}>
        <ProfileInfo imageUrl={imageUrl} nickname={nickname} skillList={skillList} />

        <Spacer size={20} />

        <Box>
          <div>
            <Text font="suit14sm" color="c1">
              IT / 유튜브 컨텐츠
            </Text>
            <Spacer size={8} />
            <Text font="suit18sb" color="b4">
              {title}
            </Text>
            <Spacer size={8} />
            <Flex alignItems="center">
              <Text font="suit12r" color="b9">
                {date}
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
            {teamRecruitmentsList.map((badge) => (
              <Badge key={badge} fontColor="b4">
                {badge}
              </Badge>
            ))}
          </Flex>
        </Box>

        <Spacer size={35} />

        <Divider color="l3" top={0} bottom={0} />

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
          <Flex alignItems="center" gap={4}>
            <SVGFeedUnScrap />
            <Text font="suit12r" color="b9">
              스크랩
            </Text>
            <Text font="suit12b" color="b9">
              {bookmarksCount > 999 ? '999+' : bookmarksCount}
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Divider color="bg1" height={8} />

      <Comments comments={commentParentResponses} />
    </>
  );
};

export default FeedDetailPage;

const DropDownBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${theme.color.w1};
  width: 88px;
  height: 70px;
  border-radius: 6px;
  padding: 10px;
  top: 40px;
  right: -6px;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.18);
`;
