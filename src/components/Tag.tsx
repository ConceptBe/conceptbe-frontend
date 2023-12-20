import styled from '@emotion/styled';

export interface TagProps {
  tags: string[];
}

const Tag = ({ tags }: TagProps) => {
  return (
    <>
      {tags.map((tag, idx) => (
        <StyledTag key={idx}>{tag}</StyledTag>
      ))}
    </>
  );
};

export default Tag;

const StyledTag = styled.div`
  background-color: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme }) => theme.colors.b9};
  font-size: 12px;
  font-weight: 500;
  padding: 6px 10px;
`;
