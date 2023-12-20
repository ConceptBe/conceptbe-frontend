import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
// ----> image, svg
import BottomBg from '../assets/images/bottom_bg.png';
import { ReactComponent as ActiveFeed } from '../assets/svg/active_feed.svg';
import { ReactComponent as Feed } from '../assets/svg/feed.svg';
import { ReactComponent as Profile } from '../assets/svg/profile.svg';
import { ReactComponent as Icon } from '../assets/svg/writeicon24.svg';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavContainer>
      <NavBackImg src={BottomBg} alt="bottom-menu-back-image" />
      <NavWrapper>
        <NavItem onClick={() => navigate('/feed')}>
          {location.pathname.startsWith('/feed') ? <ActiveFeed /> : <Feed />}
          <NavItemText>피드</NavItemText>
        </NavItem>
        <NavCenterItem>
          <Icon />
        </NavCenterItem>
        {/* <NavItem>글쓰기</NavItem> */}
        <NavItem>
          <Profile />
          <NavItemText>프로필</NavItemText>
        </NavItem>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navigation;

const NavContainer = styled.div`
  position: sticky;
  height: 65px;
  bottom: 0;
  width: 100%;
  /* margin-bottom: 10px; */
`;

const NavBackImg = styled.img`
  width: 100%;
  height: 100%;
`;

const NavWrapper = styled.nav`
  width: 100%;
  position: absolute;
  bottom: 10%;
  display: flex;
  justify-content: space-between;
  gap: 15%;
`;

const NavItem = styled.div`
  flex: 1 1 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const NavItemText = styled.span`
  font-size: 9px;
  font-weight: 700;
`;

const NavCenterItem = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.c1};
  border-radius: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 99;
`;
