import styled from '@emotion/styled';
import {
  Box,
  Flex,
  ImageView,
  PNGDefaultProfileInfo36,
  SVGScrap24,
  SVGScrapFilled24,
  Spacer,
  Text,
  TextDivider,
} from 'concept-be-design-system';
import { Fragment, MouseEventHandler } from 'react';

import { useDeleteBookmarkIdea } from '../../../../Feed/hooks/mutations/useDeleteBookmarkIdea';
import { usePostBookmarkIdea } from '../../../../Feed/hooks/mutations/usePostBookmarkIdea';
import { formatCommentDate } from '../../../../Feed/utils/formatCommentDate';
import { useIdeaIdContext, useProfileContext } from '../../NewIdeaCardContext';

type Props = {
  onClickProfile?: () => void;
};

const Profile = ({ onClickProfile }: Props) => {
  const id = useIdeaIdContext();
  const { profileImageUrl, nickname, skills, isBookmarked, createdAt } = useProfileContext();
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

  const handleClickProfile: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClickProfile?.();
  };

  return (
    <ProfileWrapper>
      <ProfileBox onClick={handleClickProfile}>
        <Box width={36} height={36} overflow="hidden" borderRadius="0 150px 150px 0">
          <ImageView src={profileImageUrl} alt="프로필" defaultSrc={PNGDefaultProfileInfo36} />
        </Box>

        <Box paddingTop={2}>
          <Text font="suit14m" color="b4">
            {nickname}
          </Text>
          <Spacer size={7} />

          <Flex width={200} wrap="wrap" alignItems="center" gap={4}>
            {skills.map((skill) => (
              <Fragment key={skill}>
                <FixedSizeText font="suit12r" color="b9">
                  {skill}
                </FixedSizeText>
                <TextDivider left={2} right={2} color="l2" />
              </Fragment>
            ))}
            <Text font="suit12r" color="b9">
              {formatCommentDate(createdAt)}
            </Text>
          </Flex>
        </Box>
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
  gap: 10px;
`;

const FixedSizeText = styled(Text)`
  width: max-content;
`;
