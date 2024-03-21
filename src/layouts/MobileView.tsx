import styled from '@emotion/styled';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { MobileViewRefContext } from './contexts/MobileViewContext';
import Navbar from './Navbar';

const MobileView = () => {
  // TODO: Header 도메인 얽힘 문제 해결 확인 시 사용 예정
  // const isMatchedHeader = hasMatched('/feed', '/feed/:id', '/profile', '/profile/:id', '/profile/:id/more');

  const mobileViewRef = useRef<HTMLDivElement | null>(null);

  return (
    <MobileViewRefContext.Provider value={{ mobileViewRef }}>
      <Container>
        <Wrapper ref={mobileViewRef}>
          <Outlet />
        </Wrapper>
        <Navbar />
      </Container>
    </MobileViewRefContext.Provider>
  );
};

export default MobileView;

const Container = styled.main`
  width: auto;
  height: 100dvh;
  max-width: 420px;
  max-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
