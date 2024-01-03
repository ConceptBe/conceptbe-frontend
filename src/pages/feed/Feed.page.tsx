import styled from '@emotion/styled';
import { useState } from 'react';

import { ReactComponent as Back } from '../../assets/svg/back_24_W.svg';
import { ReactComponent as Dots } from '../../assets/svg/FeedDetail/dots_vertical.svg';
import { ReactComponent as Like } from '../../assets/svg/FeedDetail/like.svg';
import { ReactComponent as Message } from '../../assets/svg/FeedDetail/message.svg';
import { ReactComponent as Pencil } from '../../assets/svg/FeedDetail/pencil.svg';
import { ReactComponent as ReCommnetLine } from '../../assets/svg/FeedDetail/ReCommnetLine.svg';
import { ReactComponent as UnLike } from '../../assets/svg/FeedDetail/unLike.svg';
import { ReactComponent as UnScrap } from '../../assets/svg/FeedDetail/unScrap.svg';
import { ReactComponent as Logo } from '../../assets/svg/main_logo.svg';
import { ReactComponent as X } from '../../assets/svg/x.svg';
import Divider from '../../components/@common/Divider/Divider';
import Spacer from '../../components/@common/Spacer/Spacer';
import Text from '../../components/@common/Text/Text';
import TextDivider from '../../components/@common/TextDivider/TextDivider';
import { Header } from '../../components/Header/Header';
import ProfileComponent from '../../components/Profile';
import Tag from '../../components/Tag';
const FeedDetailPage = () => {
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
          <Dots onClick={onClickDots} />
          {isClickDots && (
            <DropDownBox>
              <DropDownSelect>
                <Text font="suit12r" color="b6">
                  수정하기
                </Text>
                <Pencil />
              </DropDownSelect>

              <Divider color="bg1" height={0.1} />

              <DropDownSelect>
                <Text font="suit12r" color="b6">
                  삭제하기
                </Text>
                <X />
              </DropDownSelect>
            </DropDownBox>
          )}
        </DotsBox>
      </Header>
      <ContantWrapper>
        <ProfileComponent />
        <Spacer size={20} />

        <TitleWrapper>
          <div>
            <Text font="suit14sm" color="c1">
              IT / 유튜브 컨텐츠
            </Text>
            <Spacer size={8} />
            <Text font="suit18sb" color="b4">
              쇼츠 전용 뉴스를 함께 제작하실 분!
            </Text>
            <Spacer size={8} />
            <TitleWrapper_info>
              <Text font="suit12r" color="b9">
                2023.09.09 23:23
              </Text>
              <TextDivider left={6} right={6} color="l2" />
              <Text font="suit12r" color="b9">
                조회수 999+
              </Text>
            </TitleWrapper_info>
          </div>
        </TitleWrapper>
        <Divider color="l3" top={16} bottom={16} />

        <Text font="suit15ra" color="b6" customStyle={{ lineHeight: '24px' }}>
          현재 저희 팀은 유튜브 컨텐츠를 위해 프로젝트를 진행하고 있습니다.
          <br />
          인원 충원을 위해 멤버를 모집하고 있어요. <br />
          아래 항목을 보시고 희망하시면 문의주세요! 현재 1차 범위 진행중에 있습니다. <br /> 새로운 멤버를 찾게 되면 1차
          이후 or 범위 확장하여 연이어 진행에 들어갈 예정입니다. <br />
          <br />
          프로젝트 상세내용 여헹 정보 제공 앱 서비스 <br /> 현재 함께하는 멤버 <br /> <br />- UI 기획/ 디자인/ 마케터:
          1명 <br />
          - 브랜딩 외 디자인: 1명 <br />- 풀스택: 1명 <br />- 백엔드 개발자: 2명 프로젝트 <br /> <br />
          기간 2023년 MVP 1차 런칭 목표로 합니다.
        </Text>
      </ContantWrapper>

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
                  <Tag tags={item.tag} style={{ color: 'black' }} />
                </div>
              )}
            </div>
          );
        })}
        <Divider color="l3" />
        <InfoBottomBox>
          <IndexBox>
            <Message />
            <Text font="suit12r" color="b9">
              댓글
            </Text>
            <Text font="suit12b" color="b9">
              60
            </Text>
          </IndexBox>
          <IndexBox>
            <Like />
            <Text font="suit12r" color="b9">
              좋아요
            </Text>
            <Text font="suit12b" color="b9">
              192
            </Text>
          </IndexBox>
          <IndexBox>
            <UnScrap />
            <Text font="suit12r" color="b9">
              스크랩
            </Text>
            <Text font="suit12b" color="b9">
              430324
            </Text>
          </IndexBox>
        </InfoBottomBox>
      </InfoWrapper>

      <Divider color="bg1" height={8} />

      <CommentWrapper>
        <InputBox>
          <Input placeholder="댓글을 입력해 주세요." />
          {/* <Textarea placeholder="Your message here..." value={textareaValue} onChange={handleTextareaChange} /> */}
        </InputBox>

        <Spacer size={20} />

        <CommentsBox>
          <ProfileComponent />
          <Spacer size={20} />
          <Text font="suit14m" color="t" customStyle={{ lineHeight: '22px' }}>
            댓글 내용, 한 번에 최대 500자 까지 입력 가능. 댓글 내용, 한 번에 최대 500자 까지 입력 가능. 댓글 내용, 한
            번에 최대 500자 까지 입력 가능. 댓글 내용, 한 번에 최대 500자 까지 입력 가능. 댓글 내용, 한 번에 최대 500자
            까지 입력 가능. 댓글 내용, 한 번에 최대 500자 까지 입력 가능.
          </Text>
          <Spacer size={10} />
          <CommnetsBottomBox>
            <IndexBox>
              <Message />
              <Text font="suit12r" color="b9">
                댓글
              </Text>
              <Text font="suit12b" color="b9">
                60
              </Text>
            </IndexBox>
            <Spacer size={14} />
            <IndexBox>
              <UnLike />
              <Text font="suit12r" color="b9">
                좋아요
              </Text>
              <Text font="suit12b" color="b9">
                192
              </Text>
            </IndexBox>
          </CommnetsBottomBox>
        </CommentsBox>

        <ReCommandBox>
          <div>
            <ReCommnetLine />
          </div>
          <CommentsBox>
            <ProfileComponent />
            <Spacer size={20} />
            <Text font="suit14m" color="t" customStyle={{ lineHeight: '22px' }}>
              댓글 내용, 한 번에 최대 500자 까지 입력 가능. 댓글 내용, 한 번에 최대 500자 까지 입력 가능. 댓글 내용, 한
              번에 최대 500자 까지 입력 가능. 댓글 내용, 한 번에 최대 500자 까지 입력 가능. 댓글 내용, 한 번에 최대
              500자 까지 입력 가능. 댓글 내용, 한 번에 최대 500자 까지 입력 가능.
            </Text>
            <Spacer size={10} />
            <CommnetsBottomBox>
              <IndexBox>
                <UnLike />
                <Text font="suit12r" color="b9">
                  좋아요
                </Text>
                <Text font="suit12b" color="b9">
                  192
                </Text>
              </IndexBox>
            </CommnetsBottomBox>
          </CommentsBox>
        </ReCommandBox>
      </CommentWrapper>
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
  background-color: ${(props) => props.theme.color.w1};
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

// ContantWrapper
const ContantWrapper = styled.div`
  padding: 30px 22px 30px 22px;
  margin-top: 48px;
`;
const TitleWrapper = styled.div``;
const TitleWrapper_info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// InfoWrapper
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

// CommentWrapper
const CommentWrapper = styled.div`
  padding: 20px 22px 20px 22px;
`;

const InputBox = styled.div`
  position: relative;
`;

const Input = styled.input`
  border-radius: 6px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  background-color: ${(props) => props.theme.color.bg1};
  color: ${(props) => props.theme.color.t};
  font-style: normal;
  font-family: SUIT;
  font-weight: 400;
  line-height: normal;
  ::placeholder {
    color: ${(props) => props.theme.color.ba};
  }
`;

const CommentsBox = styled.div`
  margin: 20px 0px;
`;

const CommnetsBottomBox = styled.div`
  display: flex;
`;

const ReCommandBox = styled.div`
  display: flex;
  gap: 10px;
`;
