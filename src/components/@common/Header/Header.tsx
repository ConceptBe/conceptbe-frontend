import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Item } from './Item';
import Spacer from '../Spacer/Spacer';

interface HeaderProps {
  children: ReactNode;
  spacerPosition?: 'start' | 'end';
  main?: boolean;
}

const Header = ({ children, main, spacerPosition }: HeaderProps) => {
  return (
    <Container main={main}>
      {spacerPosition === 'start' && <Spacer size={24} />}
      {children}
      {spacerPosition === 'end' && <Spacer size={24} />}
    </Container>
  );
};

Header.Item = Item;

export default Header;

const Container = styled.header<{ main?: boolean }>`
  padding: 25px 22px;
  height: 24px;
  background: ${(props) => (props.main ? props.theme.color.c1 : props.theme.color.w1)};
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
