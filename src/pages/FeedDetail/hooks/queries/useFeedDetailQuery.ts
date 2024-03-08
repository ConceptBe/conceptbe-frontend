import { useSuspenseQuery } from '@tanstack/react-query';

import { getFeedDetail } from '../../../../api';

const useFeedDetailQuery = (id: string) => {
  const { data: feedDetail } = useSuspenseQuery({
    queryKey: ['feed', 'detail', id],
    queryFn: () => getFeedDetail(id),
    select: (data) => ({ ...data }),
  });

  return feedDetail;
};

export default useFeedDetailQuery;
