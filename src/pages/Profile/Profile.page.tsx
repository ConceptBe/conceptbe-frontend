import { useParams } from 'react-router-dom';

import MyProfile from './components/MyProfile/MyProfile.page';
import OtherProfile from './components/OtherProfile/OtherProfile.page';
import { useMemberInfoQuery } from './hooks/queries/useMemberInfoQuery';
import { getUserId } from './utils/getUserId';
import SEOMeta from '../../components/SEOMeta/SEOMeta';

const Profile = () => {
  const { id: userIdFromParams } = useParams();

  const userId = userIdFromParams ?? getUserId();

  const memberInfo = useMemberInfoQuery(userId);

  return memberInfo.isMyProfile === true ? (
    <>
      <SEOMeta title="컨셉비 | MY" description="내가 작성하고 스크랩한 글&프로필을 열람해요." />
      <MyProfile userId={userId} memberInfo={memberInfo} />
    </>
  ) : (
    <>
      <SEOMeta title="컨셉비 | 프로필" description={`${memberInfo.nickname}님의 프로필입니다.`} />
      <OtherProfile userId={userId} memberInfo={memberInfo} />
    </>
  );
};

export default Profile;
