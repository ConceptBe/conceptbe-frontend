import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface TabPannelProps {
  children: ReactNode;
  value?: number | string;
  active?: number | string;
}

const TabPannel = ({ children, value, active }: TabPannelProps) => {
  if (value === active) {
    return <Container>{children}</Container>;
  } else {
    return null;
  }
};

export default TabPannel;

const Container = styled.div``;
