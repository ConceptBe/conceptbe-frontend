import styled from '@emotion/styled';
import { Badge, Header, Spacer, TabLayout, Text, theme, SVGHeaderSetting, Flex } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import ProfileInfoSection from './components/ProfileInfoSection';
import Logo from '../../layouts/Logo';

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
        <ProfileInfoSection />

        {/* tab */}
        <TabLayout>
          <TabLayout.Tab label="아이디어">
            <TabPanelBox>
              {/* TODO: 사용자가 생성한 아이디어 GET API 필요 */}
              {/* {Array.from({ length: 20 }, (_, idx) => (
                <NewIdeaCard key={idx}  />
              ))} */}
            </TabPanelBox>
          </TabLayout.Tab>
          <TabLayout.Tab label="북마크">
            <TabPanelBox>
              {/* TODO: 사용자가 생성한 아이디어 GET API 필요 */}
              {/* {Array.from({ length: 20 }, (_, idx) => (
                <NewIdeaCard key={idx} badges={badges} />
              ))} */}
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

const TabPanelBox = styled.div`
  padding: 30px 20px 60px 20px;
  background-color: ${theme.color.bg1};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
