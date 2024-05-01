import styled from '@emotion/styled';
import { Text, theme, Header, Spinner } from 'concept-be-design-system';
import { Suspense } from 'react';

import IdeaSection from './IdeaSection';
import Back from '../../../../layouts/Back';
import { Member } from '../../types';
import ProfileInfoSection from '../ProfileInfoSection';

type Props = {
  userId: number;
  memberInfo: Member;
};

const OtherProfile = ({ userId, memberInfo }: Props) => {
  return (
    <ProfileContainer>
      <Header spacerPosition="end">
        <Back />
        <Text font="suit16sb" color="b4">
          프로필
        </Text>
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
