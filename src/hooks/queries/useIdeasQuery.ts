import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../api/http';

// IdeaCard 글 글쓴이 정보
type MemberResponse = {
  profileImageUrl: string;
  nickname: string;
  skills: string[];
};

export type Idea = {
  title: string; // 게시글 제목,
  introduce: string; // 게시글 본문,
  hitsCount: number; // 조회수,
  commentsCount: number; // 댓글 개수,
  likesCount: number; // 좋아요수,
  bookmarksCount: number; // 북마크 수,
  isBookmarked: boolean; // 현재 해당 게시글을 북마크했는지,
  createdAt: Date; // 생성시각,
  memberResponse: MemberResponse; // 게시글 작성자,
  branches: string[]; // 분야,
  teamRecruitments: string[]; // 목적
};

const getIdeas = async () => {
  return http.get<Idea[]>('/ideas?page=1&size=10');
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // const ideas: Idea[] = [
  //   {
  //     title: '쇼츠 전용 뉴스를 함께 제작하실 분!', // 게시글 제목,
  //     introduce:
  //       '뉴스를 잘 보지 않고 쇼츠와 릴스처럼 빠른 숏폼에 익숙한 2030 젊은 세대를 대상으로 쇼츠와 릴스 전용 뉴스를 한 번 만들어 볼까 합니다! 함께 하고 싶으신 분이 계시면', // 게시글 본문,
  //     hitsCount: 123, // 조회수,
  //     commentsCount: 456, // 댓글 개수,
  //     likesCount: 100, // 좋아요수,
  //     bookmarksCount: 44, // 북마크 수,
  //     isBookmarked: false, // 현재 해당 게시글을 북마크했는지,
  //     createdAt: new Date(), // 생성시각,
  //     memberResponse: { profileImageUrl: '', nickname: '영진', skills: ['UIUX 디자인', 'FE'] }, // 게시글 작성자,
  //     branches: ['IT', '유튜브 컨텐츠'], // 분야,
  //     teamRecruitments: ['영상디자인', '서비스기획', '마케팅'], // 목적
  //   },
  // ];
  // return ideas;
};

export const useIdeasQuery = () => {
  const { data: ideas, ...rest } = useSuspenseQuery({ queryKey: ['ideas'], queryFn: getIdeas });

  return { ideas, ...rest };
};
