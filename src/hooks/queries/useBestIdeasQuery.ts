import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../api/http';

// TODO:: API 문서에는 branches: string[]로 되어있는데, string이 맞지않을까..?
export type BestIdea = {
  id: number; // 게시글 id,
  branches: string; // 분야들
  title: string; // 제목
};

const getBestIdeas = async () => {
  return http.get<BestIdea[]>('/ideas/best?page=1&size=10');
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // const bestIdeas: BestIdea[] = [
  //   {
  //     id: 1,
  //     branches: 'IT',
  //     title: '쇼츠 전용 뉴스를 함께 제작하실 분!',
  //   },
  //   {
  //     id: 2,
  //     branches: '디자인',
  //     title: '디자인 시스템을 같이 만들어요!',
  //   },
  //   {
  //     id: 3,
  //     branches: '분야',
  //     title: '분야를 같이 만들어요!',
  //   },
  // ];
  // return bestIdeas;
};

export const useBestIdeasQuery = () => {
  const { data: bestIdeas, ...rest } = useSuspenseQuery({ queryKey: ['bestIdeas'], queryFn: getBestIdeas });

  return { bestIdeas, ...rest };
};
