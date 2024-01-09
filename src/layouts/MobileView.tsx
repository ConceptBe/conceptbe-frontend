import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const MobileView = () => {
  // TODO: Header 도메인 얽힘 문제 해결 확인 시 사용 예정
  // const isMatchedHeader = hasMatched('/feed', '/feed/:id', '/profile', '/profile/:id', '/profile/:id/more');

  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Navbar />
    </Container>
  );
};

export default MobileView;

const Container = styled.main`
  width: auto;
  height: 100dvh;
  max-width: 375px;
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
