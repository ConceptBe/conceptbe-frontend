import { useSuspenseQuery } from '@tanstack/react-query';

import { getFeedDetail } from '../../../api';

const useGetFeedDetail = (id: string | undefined) => {
  const { data: feedDetail } = useSuspenseQuery({
    queryKey: ['feedDetail', id],
    queryFn: () => getFeedDetail(id),
    select: (data) => ({ ...data }),
  });

  return feedDetail;
};

export default useGetFeedDetail;
