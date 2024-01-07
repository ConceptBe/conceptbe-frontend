import {
  Navigation,
  SVGNavActiveFeed,
  SVGNavActiveProfile,
  SVGNavFeed,
  SVGNavProfile,
  SVGWrite24,
} from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import useRouteMatched from '../hooks/useRouteMatch';

const Navbar = () => {
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();
  const isMatchedNavigation = hasMatched('/profile/:id', '/login', '/write', '/agreement', '/auth', '/feed/:id');

  return (
    <>
      {!isMatchedNavigation && (
        <Navigation>
          <Navigation.Item onClick={() => navigate('/')}>
            {location.pathname.startsWith('/feed') || location.pathname === '/' ? <SVGNavActiveFeed /> : <SVGNavFeed />}
          </Navigation.Item>
          <Navigation.Item position="center" onClick={() => navigate('/write')}>
            <SVGWrite24 />
          </Navigation.Item>
          <Navigation.Item onClick={() => navigate('/profile')}>
            {location.pathname.startsWith('/profile') ? <SVGNavActiveProfile /> : <SVGNavProfile />}
          </Navigation.Item>
        </Navigation>
      )}
    </>
  );
};

export default Navbar;
