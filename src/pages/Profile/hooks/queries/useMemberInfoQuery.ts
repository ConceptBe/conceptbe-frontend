import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Member } from '../../types';
import { getUserId } from '../../utils/getUserId';

const getMemberInfo = () => {
  return http.get<Member>(`/members/${getUserId()}`);
};

export const useMemberInfoQuery = () => {
  const { data: memberInfo, ...rest } = useSuspenseQuery({
    queryKey: ['members', 'detail', getUserId()],
    queryFn: getMemberInfo,
  });

  return { ...memberInfo, ...rest };
};
