import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Item } from './Item';

interface HeaderProps {
  children: ReactNode;
  main?: boolean;
  emptyStart?: boolean;
  emptyEnd?: boolean;
}

const Header = ({ children, main, emptyStart, emptyEnd }: HeaderProps) => {
  return (
    <Container main={main}>
      {emptyStart && <EmptyBox />}
      {children}
      {emptyEnd && <EmptyBox />}
    </Container>
  );
};

Header.Item = Item;

export { Header };

const Container = styled.header<{ main?: boolean }>`
  padding: 25px 22px;
  height: 24px;
  background: ${(props) => (props.main ? props.theme.colors.c1 : props.theme.colors.w1)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  max-width: 375px;
  top: 0;
  z-index: 1;
`;

const EmptyBox = styled.div`
  width: 24px;
  height: 24px;
`;
