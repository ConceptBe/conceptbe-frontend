import styled from '@emotion/styled';
import { Header, theme, SVGHeaderSetting } from 'concept-be-design-system';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import IdeaSection from './IdeaSection';
import Spinner from '../../../../components/Spinner/Spinner';
import Logo from '../../../../layouts/Logo';
import { Member } from '../../types';
import ProfileInfoSection from '../ProfileInfoSection';

type Props = {
  userId: number;
  memberInfo: Member;
};

const OtherProfile = ({ userId, memberInfo }: Props) => {
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
        <ProfileWrapper>
          <ProfileInfoSection memberInfo={memberInfo} />
          <TabPanelBox>
            <Suspense fallback={<></>}>
              <IdeaSection userId={userId} />
            </Suspense>
          </TabPanelBox>
        </ProfileWrapper>
      </Suspense>
    </ProfileContainer>
  );
};

export default OtherProfile;

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
`;
