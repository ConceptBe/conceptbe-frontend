import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Navigation from '../components/@common/Navigation/Navigation';
import useRouteMatched from '../hooks/useRouteMatch';

const MobileView = () => {
  const { hasMatched } = useRouteMatched();
  const isMatchedNavigation = hasMatched('/profile/:id', '/login', '/write', '/agreement', '/auth', '/feed/:id');

  // TODO: Header 도메인 얽힘 문제 해결 확인 시 사용 예정
  // const isMatchedHeader = hasMatched('/feed', '/feed/:id', '/profile', '/profile/:id', '/profile/:id/more');

  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
      {!isMatchedNavigation && <Navigation />}
    </Container>
  );
};

export default MobileView;

const Container = styled.main`
  height: 100%;
  max-width: 375px;
  width: auto;
  margin: 0 auto;
  min-height: 100%;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Wrapper = styled.div`
  height: 100dvh;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
