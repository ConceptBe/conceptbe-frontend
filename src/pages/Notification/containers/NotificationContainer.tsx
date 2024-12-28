import { useNavigate } from 'react-router-dom';
import useAlert from '../../../hooks/useAlert';
import { identifyAbbreviationBadge } from '../../../utils/parsing';
import { AdditionalText } from '../components/AdditionalText';
import { NotificationItem } from '../components/NotificationItem';
import { usePutNotificationRead } from '../hooks/mutations/usePutNotificationRead';
import { usePollingNotification } from '../hooks/queries/usePollingNotification';

export const NotificationContainer = () => {
  const navigate = useNavigate();
  const openAlert = useAlert();
  const { notifications } = usePollingNotification();
  const { putNotificationRead } = usePutNotificationRead();

  const onClickPutNotification = (id: number, feedId: number) => {
    putNotificationRead(id, {
      onSuccess: () => {
        navigate(`/feed/${feedId}`);
      },
      onError: () => {
        navigate('/notification');
        openAlert({ content: '삭제된 게시글입니다.' });
      },
    });
  };

  return (
    <section>
      {notifications.map(({ id, feedId, title, createAt, badges, isAlreadyRead }) => (
        <NotificationItem
          key={id}
          title={title}
          createAt={createAt}
          badges={identifyAbbreviationBadge(badges)}
          isAlreadyRead={isAlreadyRead}
          putNotificationRead={() => onClickPutNotification(id, feedId)}
        />
      ))}
      <AdditionalText isEmpty={notifications.length === 0} />
    </section>
  );
};
