import styled from '@emotion/styled';
import { Badge, Header, Spacer, TabLayout, Text, theme, SVGHeaderSetting, Flex } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import IdeaCard from '../../components/Card/IdeaCard';
import Padding from '../../components/Padding';
import Logo from '../../layouts/Logo';

// const skillTags = ['퍼포먼스 마케팅, 상', '광고/크리에이티브, 중', '콘텐츠 마케팅, 하'];
const badges = ['사이드 프로젝트', '크라우드 펀딩', '공모전'];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <ProfileContainer>
      <Header main>
        <Header.Item>
          <Logo />
        </Header.Item>
        <Header.Item>
          <SVGHeaderSetting onClick={() => navigate(`/profile/1/more`)} cursor="pointer" />
        </Header.Item>
      </Header>

      <ProfileWrapper>
        <ImageWrapper>
          <ProfileImage src="https://image.toast.com/aaaaaqx/catchtable/shopinfo/sR1B6qa4fT537GjL6KO9bHg/r1b6qa4ft537gjl6ko9bhg_2371016411290157.jpg?detail750" />
        </ImageWrapper>

        <Padding top={300} />

        <ProfileBox>
          {/* 프로필설정 */}
          <ProfileMainBox>
            <div>
              <Text font="suit15sb" color="c1">
                마케팅/영업
              </Text>
              <Spacer size={6} />
              <Text font="suit22sb">일이삼사오육칠팔구</Text>
              <Spacer size={6} />
              <Text font="suit15rb" color="b9">
                외국계 스타트업 | 강원특별자치도
              </Text>
            </div>
            <EditButton onClick={() => navigate('/profile/1')}>프로필 수정</EditButton>
          </ProfileMainBox>
          {/* 프로필 설명 */}
          <Text font="suit15rb" color="b4" style={{ lineHeight: 1.5 }}>
            안녕하세요! 8년차 일이삼사오육칠팔구십이예요😊 무신사, 에이블리, 29cm 등 핫한 커머스부터, 카카오뱅크에
            이르기까지! 디지털마케팅의 A부터 Z까지 모든것을 직접 경험한 올라운드 마케터입니다!🤩 이번에 다양한 실무
            경험을 통해 퍼포머스마케터로의 직무 전환에도 성공했어요!
          </Text>
          {/* 스킬 */}
          <div>
            <Text font="suit14m">스킬</Text>
            <Spacer size={10} />
            <TagWrapper>
              <Flex wrap="wrap" gap={6}>
                {badges.map((badge) => (
                  <Badge key={badge} backgroundColor="c1" fontColor="w1">
                    {badge}
                  </Badge>
                ))}
              </Flex>
            </TagWrapper>
          </div>
          {/* 목적 */}
          <div>
            <Text font="suit14m">목적</Text>
            <Spacer size={10} />
            <TagWrapper>
              <Flex wrap="wrap" gap={6}>
                {badges.map((badge) => (
                  <Badge key={badge} fontColor="b4">
                    {badge}
                  </Badge>
                ))}
              </Flex>
            </TagWrapper>
          </div>
        </ProfileBox>
        {/* tab */}
        <TabLayout>
          <TabLayout.Tab label="아이디어">
            <TabPanelBox>
              {Array.from({ length: 20 }, (_, idx) => (
                <IdeaCard mine key={idx} badges={badges} />
              ))}
            </TabPanelBox>
          </TabLayout.Tab>
          <TabLayout.Tab label="북마크">
            <TabPanelBox>
              {Array.from({ length: 20 }, (_, idx) => (
                <IdeaCard key={idx} badges={badges} />
              ))}
            </TabPanelBox>
          </TabLayout.Tab>
        </TabLayout>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  padding-bottom: 60px;
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 375px;
  position: fixed;
  max-width: 375px;
  top: 50px;
  z-index: -1;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-radius: 16px 16px 0 0;
  padding: 35px 22px;
  background-color: ${theme.color.w1};
`;

const ProfileMainBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${theme.color.l2};
  font-size: ${theme.font.suit13m.fontSize}px;
  font-weight: ${theme.font.suit13m.fontWeight};
  border-radius: 100px;
  padding: 8px 14px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TabPanelBox = styled.div`
  padding: 30px 20px 60px 20px;
  background-color: ${theme.color.bg1};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
