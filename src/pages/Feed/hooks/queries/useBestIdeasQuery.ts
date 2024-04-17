import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../../../api/http';
import { BestIdea } from '../../types';

const getBestIdeas = () => {
  // 기존 무한스크롤 방식에서 5개 고정 표시로 변경됨에 따라 다음과 같이 상수로 수정.
  return http.get<BestIdea[]>('/ideas/best?page=0&size=5');
};

const useBestIdeasQuery = () => {
  const { data: bestIdeas, ...rest } = useSuspenseQuery({
    queryKey: ['bestIdeas'],
    queryFn: getBestIdeas,
  });

  return { bestIdeas, ...rest };
};

export default useBestIdeasQuery;
