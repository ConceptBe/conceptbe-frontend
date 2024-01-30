import styled from '@emotion/styled';
import { Text, TextDivider, Box } from 'concept-be-design-system';

interface Props {
  imageUrl: string;
  nickname: string;
  skillList: string[];
}

const ProfileInfo = ({ imageUrl, nickname, skillList }: Props) => {
  return (
    <ProfileWrapper>
      <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
        <Img src={imageUrl} />
      </Box>
      <ProfileBox>
        <Text font="suit14m" color="b4">
          {nickname}
        </Text>
        <Profile_info>
          {skillList.map((skill, idx) => (
            <>
              <Text font="suit12r" color="b9">
                {skill || 'UI/UX'}
              </Text>
              {idx !== skillList.length - 1 && <TextDivider left={6} right={6} color="l2" />}
            </>
          ))}
        </Profile_info>
      </ProfileBox>
    </ProfileWrapper>
  );
};

export default ProfileInfo;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

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
