import styled from '@emotion/styled';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { MobileViewRefContext } from './contexts/MobileViewContext';
import Navbar from './Navbar';

const innerHeight = window.innerHeight;

const calculateKeyboardHeight = (keyboardHeightRef: MutableRefObject<number>) => {
  const visualViewHeight = window.visualViewport?.height;

  if (visualViewHeight && keyboardHeightRef.current === 0) {
    keyboardHeightRef.current = innerHeight - visualViewHeight;
  }
};

const MobileView = () => {
  const mobileViewRef = useRef<HTMLElement | null>(null);
  const keyboardHeightRef = useRef<number>(0);

  useEffect(() => {
    if (!window.visualViewport) return;
    const windowVisualViewPort = window.visualViewport;

    const onResizeViewPortHeight = () => {
      calculateKeyboardHeight(keyboardHeightRef);
    };

    windowVisualViewPort.addEventListener('resize', onResizeViewPortHeight);

    return () => {
      windowVisualViewPort.removeEventListener('resize', onResizeViewPortHeight);
    };
  }, []);

  return (
    <MobileViewRefContext.Provider value={{ mobileViewRef, keyboardHeightRef }}>
      <Wrapper ref={mobileViewRef}>
        <ScrollRestoration />
        <Outlet />
        <Navbar />
      </Wrapper>
    </MobileViewRefContext.Provider>
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
