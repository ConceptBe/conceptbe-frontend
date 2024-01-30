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
  SVGFeedReCommentLine,
  SVGFeedUnLike,
  SVGFeedUnScrap,
  SVGCancel,
  Flex,
} from 'concept-be-design-system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Comments from './components/Comments';
import useGetFeedDetail from './hooks/useGetFeedDetail';
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
  const infoIndex = [
    { indexName: '분야', tag: ['IT', '유튜브 컨텐츠'] },
    { indexName: '목적', tag: ['사이드 프로잭트', '창업', '크라우드편딩'] },
    { indexName: '협업 방식', tag: '상관없음' },
    { indexName: '모집 지역', tag: '서울특별시' },
    { indexName: '팀원모집', tag: ['서비스기획23', '서비스기5획', '서비기획', '서비스fdsa기획', '서비획'] },
  ];

  const [isClickDots, setIsClickDots] = useState(false);

  const onClickDots = () => {
    setIsClickDots(!isClickDots);
  };

  return (
    <>
      <Header main>
        <Back />
        <Logo />
        <DotsBox>
          <SVGTripleDots onClick={onClickDots} />
          {isClickDots && (
            <DropDownBox>
              <DropDownSelect>
                <Text font="suit12r" color="b6">
                  수정하기
                </Text>
                <SVGFeedPencil />
              </DropDownSelect>

              <Divider color="bg1" height={0.1} />

              <DropDownSelect>
                <Text font="suit12r" color="b6">
                  삭제하기
                </Text>
                <SVGCancel />
              </DropDownSelect>
            </DropDownBox>
          )}
        </DotsBox>
      </Header>
      <ContentWrapper>
        <ProfileInfo imageUrl={imageUrl} nickname={nickname} skillList={skillList} />

        <Spacer size={20} />

        <TitleWrapper>
          <div>
            <Text font="suit14sm" color="c1">
              IT / 유튜브 컨텐츠
            </Text>
            <Spacer size={8} />
            <Text font="suit18sb" color="b4">
              {title}
            </Text>
            <Spacer size={8} />
            <TitleWrapper_info>
              <Text font="suit12r" color="b9">
                {date}
              </Text>
              <TextDivider left={6} right={6} color="l2" />
              <Text font="suit12r" color="b9">
                조회수 {hits > 999 ? '999+' : hits}
              </Text>
            </TitleWrapper_info>
          </div>
        </TitleWrapper>
        <Divider color="l3" top={16} bottom={16} />

        <Text font="suit15ra" color="b6" style={{ lineHeight: '24px', whiteSpace: 'pre-wrap' }}>
          {introduce}
        </Text>
      </ContentWrapper>

      <Divider color="bg1" height={8} />

      <InfoWrapper>
        {infoIndex.map((item, idx) => {
          return (
            <div key={idx}>
              {typeof item.tag === 'string' ? (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Text font="suit14m" color="b9">
                    {item.indexName}
                  </Text>

                  <Text font="suit14m" color="b4">
                    {item.tag}
                  </Text>
                </div>
              ) : (
                <div>
                  <Text font="suit14m" color="b9">
                    {item.indexName}
                  </Text>
                  <Spacer size={12} />
                  <Flex wrap="wrap" gap={6}>
                    {item.tag.map((badge) => (
                      <Badge key={badge} fontColor="b4">
                        {badge}
                      </Badge>
                    ))}
                  </Flex>
                </div>
              )}
            </div>
          );
        })}
        <Divider color="l3" />
        <InfoBottomBox>
          <IndexBox>
            <SVGFeedMessage />
            <Text font="suit12r" color="b9">
              댓글
            </Text>
            <Text font="suit12b" color="b9">
              {commentsCount > 999 ? '999+' : commentsCount}
            </Text>
          </IndexBox>
          <IndexBox>
            <SVGFeedLike />
            <Text font="suit12r" color="b9">
              좋아요
            </Text>
            <Text font="suit12b" color="b9">
              {likesCount > 999 ? '999+' : likesCount}
            </Text>
          </IndexBox>
          <IndexBox>
            <SVGFeedUnScrap />
            <Text font="suit12r" color="b9">
              스크랩
            </Text>
            <Text font="suit12b" color="b9">
              {bookmarksCount > 999 ? '999+' : bookmarksCount}
            </Text>
          </IndexBox>
        </InfoBottomBox>
      </InfoWrapper>

      <Divider color="bg1" height={8} />

      <Comments comments={commentParentResponses} />
    </>
  );
};

export default FeedDetailPage;

const DotsBox = styled.div`
  position: relative;
`;

const DropDownBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${theme.color.w1};
  width: 88px;
  height: 70px;
  border-radius: 6px;
  padding: 10.5px 10px;
  translate: -67px 2px;
`;
const DropDownSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding: 30px 22px 30px 22px;
  margin-top: 48px;
`;
const TitleWrapper = styled.div``;
const TitleWrapper_info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 30px 22px 20px 22px;
`;

const InfoBottomBox = styled.div`
  margin: 18px, 0px;
  display: flex;
  justify-content: space-between;
`;
const IndexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
