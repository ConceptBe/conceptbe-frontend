import { useSuspenseQuery } from '@tanstack/react-query';

import { getFeedDetail } from '../../../../api';

const useFeedDetailQuery = (id: string) => {
  const { data: feedDetail } = useSuspenseQuery({
    queryKey: ['feed', 'detail', id],
    queryFn: () => getFeedDetail(id),
    select: (data) => ({
      ...data,
      imageResponses: [
        {
          id: 1,
          imageUrl: 'https://www.contestkorea.com/admincenter/files/meet/202207070917022079123.jpg',
        },
        {
          id: 2,
          imageUrl: 'https://news.nateimg.co.kr/orgImg/sh/2022/11/18/6812837_996935_3331.jpg',
        },
        {
          id: 3,
          imageUrl:
            'https://www.syu.ac.kr/wp-content/uploads/2020/07/%EA%B3%B5%EB%AA%A8%EC%A0%84-%ED%8F%AC%EC%8A%A4%ED%84%B0-scaled.jpg',
        },
      ],
    }),
  });

  return feedDetail;
};

export default useFeedDetailQuery;
