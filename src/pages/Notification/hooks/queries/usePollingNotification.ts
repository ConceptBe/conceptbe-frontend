import { http } from '../../../../api/http';
import { NotificationDTO } from '../../types';

export const NOTIFICATION_LIST_QUERY_KEY = 'NOTIFICATION_LIST_QUERY_KEY';

const _getNotificationList = () => http.get<NotificationDTO[]>('/somewhere');

export const usePollingNotification = () => {
  // const { data: notifications, ...rest } = useSuspenseQuery({
  //   queryKey: [NOTIFICATION_LIST_QUERY_KEY],
  //   queryFn: () => _getNotificationList(),
  //   refetchInterval: 3600,
  // });

  const notifications = tempData;
  const rest = {};

  return { notifications, ...rest };
};

const tempData = [
  {
    id: 1,
    feedId: 39,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: [
      '테스트-테스트',
      '매우긴놈매우긴놈매우긴놈',
      '매우',
      '테스트-테스트',
      '테스트-테스트',
      '테스트-테스트',
      '테스트-테스트',
    ],
  },
  {
    id: 2,
    feedId: 39,
    title: '글 제목입니다. 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트-테스트', '테스트', '테스트', '테스트', '테스트테스트'],
  },
  {
    id: 3,
    feedId: 39,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['첫번쨰가매우길다면?첫번쨰가매우길다면길다면?', '테스트'],
  },
  {
    id: 4,
    feedId: 39,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['매우긴놈매우긴놈매우긴놈매우긴놈', '테스트-테스트', '테스트-테스트', '테스트-테스트'],
  },
  {
    id: 5,
    feedId: 39,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트', '테스트', '테스트', '테스트', '테스트', 's테스트', 's테스트', 's테스트'],
  },
];
