import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/svg/main_logo.svg';
import { ReactComponent as Setting } from '../../assets/svg/setting.svg';
import Header from '../../components/@common/Header/Header';
import Spacer from '../../components/@common/Spacer/Spacer';
import Text from '../../components/@common/Text/Text';
import IdeaCard from '../../components/Card/IdeaCard';
import Padding from '../../components/Padding';
import Tab from '../../components/Tab/Tab';
import TabPannel from '../../components/Tab/TabPannel';
import Tabs from '../../components/Tab/Tabs';
import Tag from '../../components/Tag';
import UnStyleButton from '../../components/UnStyleButton';

const skillTags = ['퍼포먼스 마케팅, 상', '광고/크리에이티브, 중', '콘텐츠 마케팅, 하'];
const tags = ['사이드 프로젝트', '크라우드 펀딩', '공모전'];

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setAtiveTab] = useState(0);

  const handleTab = (event: any, newValue: any) => {
    setAtiveTab(newValue);
  };

  return (
    <ProfileContainer>
      <Header main>
        <Header.Item>
          <Logo />
        </Header.Item>
        <Header.Item>
          <UnStyleButton onClick={() => navigate(`/profile/1/more`)}>
            <Setting />
          </UnStyleButton>
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
            <EditButton>
              <UnStyleButton
                onClick={() => navigate(`/profile/1`)}
                style={{ border: `1px solid $"l2"`, borderRadius: 100, padding: '8px 14px' }}
              >
                프로필 수정
              </UnStyleButton>
            </EditButton>
          </ProfileMainBox>
          {/* 프로필 설명 */}
          <Text font="suit15rb" color="b4" customStyle={{ lineHeight: 1.5 }}>
            안녕하세요! 8년차 일이삼사오육칠팔구십이예요😊 무신사, 에이블리, 29cm 등 핫한 커머스부터, 카카오뱅크에
            이르기까지! 디지털마케팅의 A부터 Z까지 모든것을 직접 경험한 올라운드 마케터입니다!🤩 이번에 다양한 실무
            경험을 통해 퍼포머스마케터로의 직무 전환에도 성공했어요!
          </Text>
          {/* 스킬 */}
          <div>
            <Text font="suit14m">스킬</Text>
            <Spacer size={10} />
            <TagWrapper>
              <Tag tags={skillTags} select />
            </TagWrapper>
          </div>
          {/* 목적 */}
          <div>
            <Text font="suit14m">목적</Text>
            <Spacer size={10} />
            <TagWrapper>
              <Tag style={{ color: theme.color.b4 }} tags={tags} />
            </TagWrapper>
          </div>
        </ProfileBox>
        {/* tab */}
        <Tabs value={activeTab} onChange={handleTab}>
          <Tab>아이디어</Tab>
          <Tab>북마크</Tab>
        </Tabs>
        <TabPannel value={activeTab} active={0}>
          <TabPannelBox>
            {Array.from({ length: 20 }, (_, idx) => (
              <IdeaCard mine key={idx} tags={tags} />
            ))}
          </TabPannelBox>
        </TabPannel>
        <TabPannel value={activeTab} active={1}>
          <TabPannelBox>
            {Array.from({ length: 20 }, (_, idx) => (
              <IdeaCard key={idx} tags={tags} />
            ))}
          </TabPannelBox>
        </TabPannel>
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
  background-color: ${(props) => props.theme.color.w1};
`;

const ProfileMainBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.div``;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TabPannelBox = styled.div`
  padding: 30px 20px 60px 20px;
  background-color: ${({ theme }) => theme.color.bg1};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
