export type Idea = {
  id: number;
  title: string; // 게시글 제목,
  introduce: string; // 게시글 본문,
  hitsCount: number; // 조회수,
  commentsCount: number; // 댓글 개수,
  likesCount: number; // 좋아요수,
  bookmarksCount: number; // 북마크 수,
  branches: string; // 분야,
  teamRecruitments: string; // 목적
};
