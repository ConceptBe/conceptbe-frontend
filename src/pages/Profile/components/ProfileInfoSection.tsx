import styled from '@emotion/styled';
import { theme, Badge, Spacer, Text, Flex } from 'concept-be-design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Padding from '../../../components/Padding';
import { ProfileImageDefault } from '../asset';
import { Member } from '../types';

type Props = {
  memberInfo: Member;
};

const ProfileInfoSection = ({ memberInfo }: Props) => {
  const navigate = useNavigate();
  const {
    profileImageUrl,
    nickname,
    isMyProfile,
    mainSkill,
    livingPlace,
    workingPlace,
    introduction,
    skills,
    joinPurposes,
  } = memberInfo;

  const [profileImageError, setProfileImageError] = useState(false);

  const handleProfileImageError = () => {
    setProfileImageError(true);
  };

  const renderWorkingAndLivingPlace = () => {
    if (workingPlace && livingPlace) {
      return `${workingPlace} | ${livingPlace}`;
    }
    if (workingPlace) {
      return workingPlace;
    }
    if (livingPlace) {
      return livingPlace;
    }
    return '';
  };

  return (
    <>
      <ImageWrapper>
        {profileImageError === true ? (
          <ProfileImageDefault />
        ) : (
          <ProfileImage src={profileImageUrl} onError={handleProfileImageError} />
        )}
      </ImageWrapper>

      <Padding top={300} />
      <ProfileBox>
        {/* 프로필설정 */}
        <ProfileMainBox>
          <div>
            <Text font="suit15sb" color="c1">
              {mainSkill}
            </Text>
            <Spacer size={6} />
            <Text font="suit22sb">{nickname}</Text>
            <Spacer size={6} />
            <Text font="suit15rb" color="b9">
              {renderWorkingAndLivingPlace()}
            </Text>
          </div>
          {isMyProfile === true && <EditButton onClick={() => navigate(`/profile-edit`)}>프로필 수정</EditButton>}
        </ProfileMainBox>
        <Text font="suit15rb" color="b4" style={{ lineHeight: 1.5 }}>
          {introduction}
        </Text>
        <div>
          <Text font="suit14m">세부 스킬</Text>
          <Spacer size={10} />
          <TagWrapper>
            <Flex wrap="wrap" gap={6}>
              {skills.map(({ skillId, skillName }) => (
                <Badge key={skillId} backgroundColor="c1" fontColor="w1">
                  {skillName}
                </Badge>
              ))}
            </Flex>
          </TagWrapper>
        </div>
        <div>
          <Text font="suit14m">관심 영역</Text>
          <Spacer size={10} />
          <TagWrapper>
            <Flex wrap="wrap" gap={6}>
              {joinPurposes.map((badge) => (
                <Badge key={badge} fontColor="b4">
                  {badge}
                </Badge>
              ))}
            </Flex>
          </TagWrapper>
        </div>
      </ProfileBox>
    </>
  );
};

export default ProfileInfoSection;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageWrapper = styled.div`
  max-width: 420px;
  width: 100%;
  height: 375px;
  position: fixed;
  top: 50px;
  z-index: -1;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-radius: 16px 16px 0 0;
  padding: 35px 22px;
  background-color: ${theme.color.w1};
`;

const ProfileMainBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const EditButton = styled.div`
  cursor: pointer;
  border: 1px solid ${theme.color.l2};
  font-size: ${theme.font.suit13m.fontSize}px;
  font-weight: ${theme.font.suit13m.fontWeight};
  border-radius: 100px;
  padding: 8px 14px;
  word-break: keep-all;
  text-align: center;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
