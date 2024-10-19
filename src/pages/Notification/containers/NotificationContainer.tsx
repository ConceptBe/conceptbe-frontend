import { AdditionalText } from '../components/AdditionalText';
import { NotificationItem } from '../components/NotificationItem';
import { usePollingNotification } from '../hooks/queries/usePollingNotification';

export const NotificationContainer = () => {
  const { notifications } = usePollingNotification();

  return (
    <section>
      {notifications.map(({ id, feedId, title, createAt, badges }) => (
        <NotificationItem key={id} feedId={feedId} title={title} createAt={createAt} badges={badges} />
      ))}
      <AdditionalText isEmpty={notifications.length === 0} />
    </section>
  );
};
