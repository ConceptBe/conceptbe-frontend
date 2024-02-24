import styled from '@emotion/styled';
import {
  Box,
  SVGLoginDefaultProfile,
  SVGScrap24,
  SVGScrapFilled24,
  Spacer,
  Text,
  theme,
} from 'concept-be-design-system';
import { MouseEventHandler, useState } from 'react';

import { useDeleteBookmarkIdea } from '../../../../Feed/hooks/mutations/useDeleteBookmarkIdea';
import { usePostBookmarkIdea } from '../../../../Feed/hooks/mutations/usePostBookmarkIdea';
import { formatCommentDate } from '../../../../Feed/utils/formatCommentDate';
import { useIdeaId, useProfileContext } from '../../NewIdeaCardContext';

const Profile = () => {
  const id = useIdeaId();
  const { profileImageUrl, nickname, skills, isBookmarked, createdAt } = useProfileContext();
  const { postBookmarkIdea } = usePostBookmarkIdea();
  const { deleteBookmarkIdea } = useDeleteBookmarkIdea();

  // 이미지 로딩 실패를 처리하기 위한 상태
  const [imageError, setImageError] = useState(false);

  // 이미지 로딩 실패 처리 함수
  const handleImageError = () => {
    setImageError(true); // 이미지 로딩 실패 상태를 true로 설정
  };

  const bookmarkIdea: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    postBookmarkIdea(id);
  };

  const unbookmarkIdea: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    deleteBookmarkIdea(id);
  };

  return (
    <ProfileWrapper>
      <ProfileBox>
        {imageError === true ? (
          <SVGLoginDefaultProfile />
        ) : (
          <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
            <Img src={profileImageUrl} onError={handleImageError} />
          </Box>
        )}
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
      {isBookmarked ? <SVGScrapFilled24 onClick={unbookmarkIdea} /> : <SVGScrap24 onClick={bookmarkIdea} />}
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 22px 0;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
