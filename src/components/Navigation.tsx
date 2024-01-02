import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

// ----> image, svg
import BottomBg from '../assets/images/bottom_bg.png';
// import { ReactComponent as ActiveFeed } from '../assets/svg/active_feed.svg';
// import { ReactComponent as ActiveProfile } from '../assets/svg/active_profile.svg';
// import { ReactComponent as Feed } from '../assets/svg/feed.svg';
// import { ReactComponent as Profile } from '../assets/svg/profile.svg';
import { ReactComponent as Feed } from '../assets/svg/navigation/feed.svg';
import { ReactComponent as ActiveFeed } from '../assets/svg/navigation/feed_active.svg';
import { ReactComponent as Profile } from '../assets/svg/navigation/profile.svg';
import { ReactComponent as ActiveProfile } from '../assets/svg/navigation/profile_active.svg';
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
          {/* <NavItemText>피드</NavItemText> */}
        </NavItem>
        <NavCenterItem>
          <Icon />
        </NavCenterItem>
        {/* <NavItem>글쓰기</NavItem> */}
        <NavItem onClick={() => navigate('/profile')}>
          {location.pathname.startsWith('/profile') ? <ActiveProfile /> : <Profile />}
          {/* <NavItemText>프로필</NavItemText> */}
        </NavItem>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navigation;

const NavContainer = styled.div`
  position: fixed;
  height: 75px;
  bottom: 0;
  width: 100%;
  left: 50%; /* Move the starting point of the navigation to the center of the viewport */
  transform: translateX(-50%); /* Shift the navigation to the left by half of its width */
  max-width: 375px; /* Set the max-width to match the main layout */
`;

const NavBackImg = styled.img`
  width: 100%;
  height: 100%;
`;

const NavWrapper = styled.nav`
  width: 100%;
  position: absolute;
  bottom: 8%;
  display: flex;
  justify-content: space-between;
  gap: 20%;
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

const NavCenterItem = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.color.c1};
  border-radius: 50%;
  bottom: -3px;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 58px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 99;
`;
