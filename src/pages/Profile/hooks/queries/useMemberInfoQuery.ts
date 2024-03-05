import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { Member } from '../../types';
import { memberId } from '../../utils/memberId';

const getMemberInfo = () => {
  return http.get<Member>(`/members/${memberId}`);
};

export const useMemberInfoQuery = () => {
  const { data: memberInfo, ...rest } = useSuspenseQuery({
    queryKey: ['members', 'detail', memberId],
    queryFn: getMemberInfo,
  });

  return { ...memberInfo, ...rest };
};
