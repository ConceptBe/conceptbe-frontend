import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export interface TagProps {
  tags: string[];
  select?: boolean;
  style?: CSSProperties;
}

const Tag = ({ tags, select = false, style }: TagProps) => {
  return (
    <TagWrapper>
      {tags.map((tag, idx) => (
        <StyledTag key={idx} select={select} style={{ ...style }}>
          {tag}
        </StyledTag>
      ))}
    </TagWrapper>
  );
};

export default Tag;
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const StyledTag = styled.div<{ select: boolean }>`
  display: flex;
  align-items: center;
  height: 27px;
  background-color: ${({ theme, select }) => (select ? theme.colors.c1 : theme.colors.bg1)};
  color: ${({ theme, select }) => (select ? theme.colors.w1 : theme.colors.b9)};
  font-size: 12px;
  font-weight: 500;
  padding: 0px 10px;
  border-radius: 4px;
`;
