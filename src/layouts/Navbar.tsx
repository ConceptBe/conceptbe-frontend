import {
  Navigation,
  SVGNavAlarm,
  SVGNavAlarmFilled,
  SVGNavEdit,
  SVGNavEditFilled,
  SVGNavHome,
  SVGNavHomeFilled,
  SVGNavUser,
  SVGNavUserFilled,
  Text,
} from 'concept-be-design-system';
import { useNavigate, useParams } from 'react-router-dom';

import useRouteMatched from '../hooks/useRouteMatch';
import { getUserId } from '../pages/Profile/utils/getUserId';

const Navbar = () => {
  const { id: userIdFromParams } = useParams();
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();
  const isShowNavigation = hasMatched('/', '/profile/:id', '/notification');

  return (
    <>
      {isShowNavigation && (
        <Navigation css={{ borderTop: '1px solid #E5E5E5' }}>
          <Navigation.Item onClick={() => navigate('/')}>
            {location.pathname.startsWith('/feed') || location.pathname === '/' ? <SVGNavHomeFilled /> : <SVGNavHome />}
            <Text font="suit10eb" style={{ margin: '4px 0 8px 0' }}>
              피드
            </Text>
          </Navigation.Item>
          <Navigation.Item onClick={() => navigate('/write')}>
            {location.pathname.startsWith('/write') || location.pathname === '/write' ? (
              <SVGNavEditFilled />
            ) : (
              <SVGNavEdit />
            )}
            <Text font="suit10eb" style={{ margin: '4px 0 8px 0' }}>
              글쓰기
            </Text>
          </Navigation.Item>
          <Navigation.Item onClick={() => navigate('/notification')}>
            {location.pathname.startsWith('/notification') || location.pathname === '/notification' ? (
              <SVGNavAlarmFilled />
            ) : (
              <SVGNavAlarm />
            )}
            <Text font="suit10eb" style={{ margin: '4px 0 8px 0' }}>
              알림
            </Text>
          </Navigation.Item>
          <Navigation.Item onClick={() => navigate(`/profile/${getUserId()}`)}>
            {Number(userIdFromParams) === getUserId() ? <SVGNavUserFilled /> : <SVGNavUser />}
            <Text font="suit10eb" style={{ margin: '4px 0 8px 0' }}>
              내 프로필
            </Text>
          </Navigation.Item>
        </Navigation>
      )}
    </>
  );
};

export default Navbar;
