import styled from '@emotion/styled';
import { SVGLoginDefaultProfile, SVGScrap24, SVGScrapFilled24, Spacer, Text, theme } from 'concept-be-design-system';
import { MouseEventHandler } from 'react';

import { useDeleteBookmarkIdea } from '../../../../Feed/hooks/mutations/useDeleteBookmarkIdea';
import { usePostBookmarkIdea } from '../../../../Feed/hooks/mutations/usePostBookmarkIdea';
import { formatCommentDate } from '../../../../Feed/utils/formatCommentDate';
import { useIdeaId, useProfileContext } from '../../NewIdeaCardContext';

const Profile = () => {
  const id = useIdeaId();
  const { nickname, skills, isBookmarked, createdAt } = useProfileContext();
  const { postBookmarkIdea } = usePostBookmarkIdea();
  const { deleteBookmarkIdea } = useDeleteBookmarkIdea();

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
