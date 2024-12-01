import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '../../../../api/http';
import { NotificationDTO } from '../../types';

export const NOTIFICATION_LIST_QUERY_KEY = 'NOTIFICATION_LIST_QUERY_KEY';

const _getNotificationList = () => http.get<NotificationDTO[]>('/notifications');

export const usePollingNotification = () => {
  const { data: notifications, ...rest } = useSuspenseQuery({
    queryKey: [NOTIFICATION_LIST_QUERY_KEY],
    queryFn: () => _getNotificationList(),
    refetchInterval: 60000,
  });

  return { notifications, ...rest };
};
