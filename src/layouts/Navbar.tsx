import {
  Navigation,
  SVGNavActiveFeed,
  SVGNavActiveProfile,
  SVGNavFeed,
  SVGNavProfile,
  SVGNavWrite24,
} from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import useRouteMatched from '../hooks/useRouteMatch';

const Navbar = () => {
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();
  const isMatchedNavigation = hasMatched(
    '/profile/:id',
    '/login',
    '/write',
    '/agreement',
    '/auth',
    '/feed/:id',
    '/sign-up',
    '/write-edit',
    '/oauth/*',
  );

  return (
    <>
      {!isMatchedNavigation && (
        <Navigation>
          <Navigation.Item onClick={() => navigate('/')}>
            {location.pathname.startsWith('/feed') || location.pathname === '/' ? <SVGNavActiveFeed /> : <SVGNavFeed />}
          </Navigation.Item>
          <Navigation.Item position="center" onClick={() => navigate('/write')}>
            <SVGNavWrite24 />
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
