import {
  Navigation,
  SVGNavActiveFeed,
  SVGNavActiveProfile,
  SVGNavFeed,
  SVGNavProfile,
  SVGNavWrite24,
} from 'concept-be-design-system';
import { useNavigate, useParams } from 'react-router-dom';

import useRouteMatched from '../hooks/useRouteMatch';
import { getUserId } from '../pages/Profile/utils/getUserId';

const Navbar = () => {
  const { id: userIdFromParams } = useParams();
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();
  const isShowNavigation = hasMatched('/', '/profile/:id');

  return (
    <>
      {isShowNavigation && (
        <Navigation>
          <Navigation.Item onClick={() => navigate('/')}>
            {location.pathname.startsWith('/feed') || location.pathname === '/' ? <SVGNavActiveFeed /> : <SVGNavFeed />}
          </Navigation.Item>
          <Navigation.Item position="center" onClick={() => navigate('/write')}>
            <SVGNavWrite24 />
          </Navigation.Item>
          <Navigation.Item onClick={() => navigate(`/profile/${getUserId()}`)}>
            {Number(userIdFromParams) === getUserId() ? <SVGNavActiveProfile /> : <SVGNavProfile />}
          </Navigation.Item>
        </Navigation>
      )}
    </>
  );
};

export default Navbar;
