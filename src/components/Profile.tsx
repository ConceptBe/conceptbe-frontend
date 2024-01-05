import styled from '@emotion/styled';

import Spacer from './@common/Spacer/Spacer.tsx';
import Text from './@common/Text/Text.tsx';
import TextDivider from './@common/TextDivider/TextDivider.tsx';
import { ReactComponent as Profile } from '../assets/svg/default_profile.svg';
import { ReactComponent as UnScrap } from '../assets/svg/scrap.svg';

const ProfileComponent = () => {
  return (
    <ProfileWrapper>
      <Profile />
      <ProfileBox>
        <Text font="suit14m" color="b4">
          일이삼사오육칠팔구
        </Text>
        <Spacer size={6} />
        <Profile_info>
          <Text font="suit12r" color="b9">
            UXUI
          </Text>
          <TextDivider left={6} right={6} color="l2" />
          <Text font="suit12r" color="b9">
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
