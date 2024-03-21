import styled from '@emotion/styled';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { MobileViewRefContext } from './contexts/MobileViewContext';
import Navbar from './Navbar';

const MobileView = () => {
  // TODO: Header 도메인 얽힘 문제 해결 확인 시 사용 예정
  // const isMatchedHeader = hasMatched('/feed', '/feed/:id', '/profile', '/profile/:id', '/profile/:id/more');

  const mobileViewRef = useRef<HTMLElement | null>(null);

  return (
    <MobileViewRefContext.Provider value={{ mobileViewRef }}>
      <Wrapper ref={mobileViewRef}>
        <Outlet />
        <Navbar />
      </Wrapper>
    </MobileViewRefContext.Provider>
  );
};

export default MobileView;

const Wrapper = styled.main`
  width: 100%;
  height: 100dvh;
  max-width: 420px;
  max-height: 100%;
  overflow: auto;
  margin: 0 auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
