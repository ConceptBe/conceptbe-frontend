import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Item } from './Item';

interface HeaderProps {
  children: ReactNode;
  main?: boolean;
}

const Header = ({ children, main }: HeaderProps) => {
  return <Container main={main}>{children}</Container>;
};

Header.Item = Item;

export { Header };

const Container = styled.header<{ main?: boolean }>`
  padding: 15px 22px;
  height: 24px;
  background: ${(props) => (props.main ? props.theme.colors.c1 : props.theme.colors.w1)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;
