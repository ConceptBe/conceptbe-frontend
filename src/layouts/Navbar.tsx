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

import styled from '@emotion/styled';
import useRouteMatched from '../hooks/useRouteMatch';
import { usePollingNotification } from '../pages/Notification/hooks/queries/usePollingNotification';
import { getUserId } from '../pages/Profile/utils/getUserId';

const Navbar = () => {
  const { id: userIdFromParams } = useParams();
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();
  const isShowNavigation = hasMatched('/', '/profile/:id', '/notification');

  const { notifications } = usePollingNotification();

  const unReadNotifications = notifications?.filter(({ isAlreadyRead }) => !isAlreadyRead) ?? [];

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
          <Navigation.Item onClick={() => navigate('/notification')} style={{ position: 'relative' }}>
            {unReadNotifications.length > 0 && <NotificationPop>{unReadNotifications.length}</NotificationPop>}
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

const NotificationPop = styled.div`
  height: 16px;
  border-radius: 100px;
  background-color: #f34444;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  color: #fff;
  font-size: 12px;
  top: -10%;
  right: 25%;
`;
