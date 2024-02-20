import styled from '@emotion/styled';
import { Badge, Divider, Flex, Spacer, Text, theme } from 'concept-be-design-system';
import { MouseEventHandler, useState } from 'react';

import { ReactComponent as SVGMore24 } from '../assets/more24.svg';
import { ReactComponent as SVGPencil16 } from '../assets/pencil16.svg';
import { ReactComponent as SVGX16 } from '../assets/x16.svg';
import { useContentContext } from '../NewIdeaCardContext';

const DropdownWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 1.5rem;
  right: 0;
  width: max-content;
  background-color: ${theme.color.w1};
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const DropdownItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.l2};
  }
`;
const Dropdown = () => {
  return (
    <DropdownWrapper>
      <DropdownItem>
        <Text font="suit12r" color="b6">
          수정하기
        </Text>
        {/* TODO: 드롭다운에 쓰이는 연필, 삭제버튼 아이콘 디자인시스템에 추가 */}
        <SVGPencil16 />
      </DropdownItem>
      <Divider color="l3" />
      <DropdownItem>
        <Text font="suit12r" color="b6">
          삭제하기
        </Text>
        <SVGX16 />
      </DropdownItem>
    </DropdownWrapper>
  );
};

const Content = () => {
  const { branches, title, introduce, teamRecruitments } = useContentContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isTeamRecruitmentsExist = teamRecruitments.length > 0;

  const TeamRecruitmentsBadges = (teamRecruitments: string[]) => {
    const badges = teamRecruitments.map((teamRecruitment, idx) => (
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
        <Flex position="relative">
          {/* TODO: SVGMore24 디자인시스템에 추가 */}
          <SVGMore24 onClick={toggleDropdown} />
          {isDropdownOpen && <Dropdown />}
        </Flex>
      </Flex>
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
