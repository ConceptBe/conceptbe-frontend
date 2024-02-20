import styled from '@emotion/styled';
import { Badge, Flex, Spacer, Text, theme } from 'concept-be-design-system';

import { useContentContext } from '../NewIdeaCardContext';

const Content = () => {
  const { branches, title, introduce, teamRecruitments } = useContentContext();

  const isTeamRecruitmentsExist = teamRecruitments.length > 0;

  const TeamRecruitmentsBadges = (teamRecruitments: string[]) => {
    const badges = teamRecruitments.map((teamRecruitment, idx) => (
      <Badge key={`${teamRecruitment}-${idx}`}>{teamRecruitment}</Badge>
    ));

    return badges.length > 5
      ? [...badges.slice(0, 5), <Badge key="모집중">+{badges.length - 5} 모집중</Badge>]
      : badges;
  };

  return (
    <ContentWrapper>
      <Text font="suit14m" color="c1">
        {branches.join(' / ')}
      </Text>
      <Spacer size={7} />

      <Text font="suit16sb">{title}</Text>
      <Spacer size={10} />

      <ContentText>{introduce}</ContentText>

      {isTeamRecruitmentsExist && (
        <>
          <Spacer size={14} />
          <TagWrapper>
            <Flex wrap="wrap" gap={6}>
              {TeamRecruitmentsBadges(teamRecruitments)}
            </Flex>
          </TagWrapper>
        </>
      )}
    </ContentWrapper>
  );
};

export default Content;

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
