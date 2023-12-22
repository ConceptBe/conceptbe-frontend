import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Spacer from './Spacer.tsx';
import Text from './Text.tsx';
import TextDivider from './TextDivider.tsx';
import { ReactComponent as Profile } from '../assets/svg/default_profile.svg';
import { ReactComponent as UnScrap } from '../assets/svg/scrap.svg';

const ProfileComponent = () => {
  const theme = useTheme();
  return (
    <ProfileWrapper>
      <Profile />
      <ProfileBox>
        <Text font={theme.typography.suit14m} color={theme.colors.b4}>
          일이삼사오육칠팔구
        </Text>
        <Spacer bottom="6px" />
        <Profile_info>
          <Text font={theme.typography.suit12r} color={theme.colors.b9}>
            UXUI
          </Text>
          <TextDivider margin={6} color={theme.colors.l2} />
          <Text font={theme.typography.suit12r} color={theme.colors.b9}>
            영상디자인
          </Text>
        </Profile_info>
      </ProfileBox>
    </ProfileWrapper>
  );
};

export default ProfileComponent;

const ProfileWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 10px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;
`;

const Profile_info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
