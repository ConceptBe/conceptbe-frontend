import { useParams } from 'react-router-dom';

import MyProfile from './components/MyProfile/MyProfile.page';
import OtherProfile from './components/OtherProfile/OtherProfile.page';
import { useMemberInfoQuery } from './hooks/queries/useMemberInfoQuery';
import { getUserId } from './utils/getUserId';

const Profile = () => {
  const { id: userIdFromParams } = useParams();

  const userId = userIdFromParams ?? getUserId();

  const memberInfo = useMemberInfoQuery(userId);

  return memberInfo.isMyProfile === true ? (
    <MyProfile userId={userId} memberInfo={memberInfo} />
  ) : (
    <OtherProfile userId={userId} memberInfo={memberInfo} />
  );
};

export default Profile;
