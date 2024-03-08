import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../api/http';
import { Profile } from '../types';

const getMember = (id: string) => http.get<Profile>(`/members/${id}`);

const useMemberQuery = (id: string) => {
  const { data: my, ...rest } = useSuspenseQuery({
    queryKey: ['profile', id],
    queryFn: () => getMember(id),
  });

  return { my, ...rest };
};

export default useMemberQuery;
