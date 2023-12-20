import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface FilterBoxProps {
  children: ReactNode;
}

const FilterBox = ({ children }: FilterBoxProps) => {
  return <Container>{children}</Container>;
};

export default FilterBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
