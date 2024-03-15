import styled from '@emotion/styled';
import { Header, TabLayout, theme, SVGHeaderSetting, Box } from 'concept-be-design-system';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import BookmarkSection from './BookmarkSection';
import IdeaSection from './IdeaSection';
import Spinner from '../../../../components/Spinner/Spinner';
import Logo from '../../../../layouts/Logo';
import { Member } from '../../types';
import ProfileInfoSection from '../ProfileInfoSection';

type Props = {
  userId: number;
  memberInfo: Member;
};

const MyProfile = ({ userId, memberInfo }: Props) => {
  const navigate = useNavigate();

  return (
    <ProfileContainer>
      <Header main>
        <Header.Item>
          <Logo />
        </Header.Item>
        <Header.Item>
          <SVGHeaderSetting onClick={() => navigate(`/profile/${userId}/more`)} cursor="pointer" />
        </Header.Item>
      </Header>

      <Suspense fallback={<Spinner />}>
        <Box>
          <ProfileInfoSection memberInfo={memberInfo} />
          <TabLayout maxWidth={420} height="100%">
            <TabLayout.Tab label="아이디어">
              <TabPanelBox>
                <Suspense fallback={<></>}>
                  <IdeaSection userId={userId} />
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
        </Box>
      </Suspense>
    </ProfileContainer>
  );
};

export default MyProfile;

const ProfileContainer = styled.div`
  padding-bottom: 60px;
`;

const TabPanelBox = styled.div`
  padding: 30px 20px 60px 20px;
  background-color: ${theme.color.bg1};
  display: flex;
  flex-direction: column;
`;
