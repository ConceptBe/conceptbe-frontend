import { useMutation } from '@tanstack/react-query';
import { http } from '../../../../api/http';

const _putNotificationRead = (notificationId: number) => http.put(`/notifications/${notificationId}/read`);

export const usePutNotificationRead = () => {
  const { mutate: putNotificationRead, ...rest } = useMutation({
    mutationFn: (notificationId: number) => _putNotificationRead(notificationId),
  });

  return { putNotificationRead, ...rest };
};
