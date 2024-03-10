import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Member } from '../../types';

const getMemberInfo = (userId: number) => {
  return http.get<Member>(`/members/${userId}`);
};

export const useMemberInfoQuery = (userId: number) => {
  const { data: memberInfo, ...rest } = useSuspenseQuery({
    queryKey: ['members', 'detail', userId],
    queryFn: () => getMemberInfo(userId),
  });

  return { ...memberInfo, ...rest };
};
