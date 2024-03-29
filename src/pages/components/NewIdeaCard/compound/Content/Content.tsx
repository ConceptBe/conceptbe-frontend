import styled from '@emotion/styled';
import { Badge, Flex, Spacer, Text, theme, SVGMore24 } from 'concept-be-design-system';
import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentEditDropdown from './ContentEditDropdown';
import { useContentContext, useIdeaIdContext } from '../../NewIdeaCardContext';

type Props = {
  onClickDelete?: () => void;
};

const Content = ({ onClickDelete }: Props) => {
  const ideaId = useIdeaIdContext();
  const { canEdit, branches, title, introduce, skillCategories } = useContentContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isSkillCategoriesExist = skillCategories.length > 0;

  const SkillCategoriesBadges = (skillCategories: string[]) => {
    const badges = skillCategories.map((teamRecruitment, idx) => (
      <Badge key={`${teamRecruitment}-${idx}`}>{teamRecruitment}</Badge>
    ));

    return badges.length > 5
      ? [...badges.slice(0, 5), <Badge key="모집중">+{badges.length - 5} 모집중</Badge>]
      : badges;
  };

  const toggleDropdown: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const goWriteEditPage = () => {
    navigate('/write-edit', { state: { ideaId } });
  };

  return (
    <ContentWrapper>
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Text font="suit14m" color="c1">
            {branches.join(' / ')}
          </Text>
          <Spacer size={7} />

          <Text font="suit16sb">{title}</Text>
        </Flex>

        {canEdit && (
          <Flex position="relative">
            <SVGMore24 onClick={toggleDropdown} />
            {isDropdownOpen && <ContentEditDropdown onClickEdit={goWriteEditPage} onClickDelete={onClickDelete} />}
          </Flex>
        )}
      </Flex>
      <Spacer size={10} />

      <ContentText>{introduce}</ContentText>

      {isSkillCategoriesExist && (
        <>
          <Spacer size={14} />
          <TagWrapper>
            <Flex wrap="wrap" gap={6}>
              {SkillCategoriesBadges(skillCategories)}
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
`;

const ContentText = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${theme.color.b6};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const TagWrapper = styled.div`
  padding: 0;
`;
