import styled from '@emotion/styled';
import { SVGLoginDefaultProfile, SVGScrap24, SVGScrapFilled24, Spacer, Text, theme } from 'concept-be-design-system';
import { useContext } from 'react';

import { formatCommentDate } from '../../../utils/formatCommentDate';
import { newIdeaCardContext } from '../NewIdeaCard';

const Profile = () => {
  const { profile } = useContext(newIdeaCardContext)!;
  if (!profile) {
    console.error('NewIdeaCard 컴포넌트 prop에 profile이 필요합니다.');
    return;
  }
  const { nickname, skills, isBookmarked, createdAt } = profile;

  return (
    <ProfileWrapper>
      <ProfileBox>
        <SVGLoginDefaultProfile />
        <div>
          <Text font="suit14m" color="b4">
            {nickname}
          </Text>
          <Spacer size={7} />

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text font="suit12r" color="b9">
              {skills.join(' | ')}
            </Text>
            <Spacer size={6} />
            <div style={{ width: 1, height: 10, backgroundColor: theme.color.l2 }} />
            <Spacer size={6} />
            <Text font="suit12r" color="b9">
              {formatCommentDate(createdAt)}
            </Text>
          </div>
        </div>
      </ProfileBox>
      {isBookmarked ? <SVGScrapFilled24 /> : <SVGScrap24 />}
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
