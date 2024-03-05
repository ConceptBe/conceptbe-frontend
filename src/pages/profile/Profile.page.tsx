import styled from '@emotion/styled';
import { Header, TabLayout, theme, SVGHeaderSetting } from 'concept-be-design-system';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import BookmarkSection from './components/BookmarkSection';
import IdeaSection from './components/IdeaSection';
import ProfileInfoSection from './components/ProfileInfoSection';
import Spinner from '../../components/Spinner/Spinner';
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

      <Suspense fallback={<Spinner />}>
        <ProfileWrapper>
          <ProfileInfoSection />
          <TabLayout>
            <TabLayout.Tab label="아이디어">
              <TabPanelBox>
                <Suspense fallback={<></>}>
                  <IdeaSection />
                </Suspense>
              </TabPanelBox>
            </TabLayout.Tab>
            <TabLayout.Tab label="북마크">
              <TabPanelBox>
                <Suspense fallback={<></>}>
                  <BookmarkSection />
                </Suspense>
              </TabPanelBox>
            </TabLayout.Tab>
          </TabLayout>
        </ProfileWrapper>
      </Suspense>
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
  height: 100%;
  display: flex;
  flex-direction: column;
`;
