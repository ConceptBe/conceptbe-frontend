import styled from '@emotion/styled';

import Text from './@common/Text/Text.tsx';
import Spacer from './Spacer.tsx';
import TextDivider from './TextDivider.tsx';
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
        <Spacer bottom="6px" />
        <Profile_info>
          <Text font="suit12r" color="b9">
            UXUI
          </Text>
          <TextDivider margin={6} color="l2" />
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
