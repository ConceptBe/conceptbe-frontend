import styled from '@emotion/styled';
import {
  Badge,
  Divider,
  Spacer,
  Text,
  theme,
  SVGCardComment14,
  SVGLoginDefaultProfile,
  SVGTripleDots,
  SVGCardLike14,
  SVGScrap24,
  SVGCardScrap14,
  SVGCardView14,
  Flex,
} from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import { Idea } from '../../../hooks/queries/useIdeasQuery';

interface Props {
  idea: Idea;
}

const NewIdeaCard = ({
  idea: {
    title,
    introduce,
    hitsCount,
    commentsCount,
    likesCount,
    bookmarksCount,
    isBookmarked,
    createdAt,
    memberResponse,
    branches,
    teamRecruitments,
  },
}: Props) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate('/feed/1')}>
      <ProfileWrapper>
        <ProfileBox>
          <SVGLoginDefaultProfile />
          <div>
            <Text font="suit14m" color="b4">
              {memberResponse.nickname}
            </Text>
            <Spacer size={7} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text font="suit12r" color="b9">
                {memberResponse.mainSkill}
              </Text>
              <Spacer size={6} />
              <div style={{ width: 1, height: 10, backgroundColor: theme.color.l2 }} />
              <Spacer size={6} />
              <Text font="suit12r" color="b9">
                {createdAt.toISOString().slice(0, 10)}
              </Text>
            </div>
          </div>
        </ProfileBox>
        {/* {mine ? <SVGTripleDots color="ba" /> : <SVGScrap24 />} */}
      </ProfileWrapper>

      <ContentWrapper>
        <Text font="suit14m" color="c1">
          {branches.join(' / ')}
        </Text>
        <Spacer size={7} />

        <Text font="suit16sb">{title}</Text>
        <Spacer size={10} />

        <ContentText>{introduce}</ContentText>
        <Spacer size={14} />

        <TagWrapper>
          <Flex wrap="wrap" gap={6}>
            {teamRecruitments.map((teamRecruitment, idx) => (
              <Badge key={`${teamRecruitment}-${idx}`}>{teamRecruitment}</Badge>
            ))}
          </Flex>
        </TagWrapper>
      </ContentWrapper>

      <Divider top={18} bottom={16} color="l3" />
      <FooterWrapper>
        <FooterText>
          <SVGCardView14 />
          {hitsCount}
        </FooterText>
        <FooterText>
          <SVGCardComment14 />
          {commentsCount}
        </FooterText>
        <FooterText>
          <SVGCardLike14 />
          {likesCount}
        </FooterText>
        <FooterText>
          <SVGCardScrap14 />
          {bookmarksCount}
        </FooterText>
      </FooterWrapper>
    </CardContainer>
  );
};

export default NewIdeaCard;

export const CardContainer = styled.div`
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.08);
  background-color: ${theme.color.w1};
  cursor: pointer;
`;

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 22px 0 0;
`;

const ContentText = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${theme.color.b6};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const TagWrapper = styled.div`
  padding: 0;
`;

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

//const FooterBox = styled.div``;

const FooterText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${theme.color.b9};
  margin-right: 10px;
`;