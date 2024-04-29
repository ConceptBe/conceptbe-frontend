import styled from '@emotion/styled';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import Navbar from './Navbar';

const MobileView = () => {
  return (
    <Wrapper>
      <ScrollRestoration />
      <Outlet />
      <Navbar />
    </Wrapper>
  );
};

export default MobileView;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  max-width: 420px;
  overflow: auto;
  margin: 0 auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
