import styled from '@emotion/styled';
import {
  Badge,
  Box,
  Flex,
  Spacer,
  SVGMore24,
  SVGScrap24,
  SVGScrapFilled24,
  Text,
  theme,
} from 'concept-be-design-system';
import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { identifyAbbreviationBadge } from '../../../../../utils/parsing';
import { useDeleteBookmarkIdea } from '../../../../Feed/hooks/mutations/useDeleteBookmarkIdea';
import { usePostBookmarkIdea } from '../../../../Feed/hooks/mutations/usePostBookmarkIdea';
import { useContentContext, useIdeaIdContext, useProfileContext } from '../../NewIdeaCardContext';
import ContentEditDropdown from './ContentEditDropdown';

type Props = {
  onClick?: () => void;
};

const Content = ({ onClick }: Props) => {
  const ideaId = useIdeaIdContext();
  const { canEdit, branches, title, introduce, skillCategories } = useContentContext();
  const { isBookmarked, createdAt } = useProfileContext();

  const { postBookmarkIdea } = usePostBookmarkIdea();
  const { deleteBookmarkIdea } = useDeleteBookmarkIdea();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isSkillCategoriesExist = skillCategories.length > 0;

  const bookmarkIdea: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    postBookmarkIdea(ideaId);
  };

  const unbookmarkIdea: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    deleteBookmarkIdea(ideaId);
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
          <LineHeightText font="suit16sb">{title}</LineHeightText>
          <Spacer size={4} />
          <Text font="suit14r" color="b6">
            {`${createdAt?.split('T')[0]} ${createdAt.split('T')[1]?.substring(0, 5)}`}
          </Text>
        </Flex>

        {canEdit ? (
          <Flex position="relative">
            <SVGMore24 onClick={toggleDropdown} />
            {isDropdownOpen && <ContentEditDropdown onClickEdit={goWriteEditPage} onClickDelete={onClick} />}
          </Flex>
        ) : (
          <Box>
            {isBookmarked ? <SVGScrapFilled24 onClick={unbookmarkIdea} /> : <SVGScrap24 onClick={bookmarkIdea} />}
          </Box>
        )}
      </Flex>

      <Spacer size={12} />

      <div css={{ display: 'flex', gap: 4 }}>
        {branches.map((branch) => (
          <Badge backgroundColor="c1" fontColor="w1" key={branch}>
            {branch}
          </Badge>
        ))}
      </div>

      <Spacer size={12} />

      <ContentText>{introduce}</ContentText>

      {isSkillCategoriesExist && (
        <>
          <Spacer size={14} />
          <TagWrapper>
            <Flex wrap="wrap" gap={6}>
              {identifyAbbreviationBadge(skillCategories, 15).map((category) => (
                <Badge key={category} backgroundColor="bg1" radius={50}>
                  {category}
                </Badge>
              ))}
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

const LineHeightText = styled(Text)`
  line-height: 20px;
`;
