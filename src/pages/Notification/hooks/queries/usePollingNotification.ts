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
    feedId: 101,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트-테스트', '테스트-테스트', '테스트-테스트', '좋테스트-테스트'],
  },
  {
    id: 2,
    feedId: 113,
    title: '글 제목입니다. 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트-테스트', '테스트-테스트', '테스트-테스트', '좋테스트-테스트'],
  },
  {
    id: 3,
    feedId: 114,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트-테스트', '테스트-테스트', '테스트-테스트', '좋테스트-테스트'],
  },
  {
    id: 4,
    feedId: 115,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트-테스트', '테스트-테스트', '테스트-테스트', '좋테스트-테스트'],
  },
  {
    id: 5,
    feedId: 116,
    title: '글 제목입니다. 두 줄짜리 제목으로 확장합니다. 두 줄짜리 제목으로 확장합니다.',
    createAt: '2022.11.18',
    badges: ['테스트-테스트', '테스트-테스트', '테스트-테스트', '좋테스트-테스트'],
  },
];
