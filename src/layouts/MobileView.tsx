import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';
import useRouteMatched from '../hooks/useRouteMatch';

const MobileView = () => {
  const isMatch = useRouteMatched('/profile/:id', '/login', '/write', '/agreement', '/auth', '/feed/:id');
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
      {!isMatch && <Navigation />}
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
  /* height: calc(100% - 50px); */
  height: 100dvh;
  /* height: calc(var(--vh, 1vh) * 100); */
  /* height: -webkit-fill-available; */
  /* height: fill-available; */
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
