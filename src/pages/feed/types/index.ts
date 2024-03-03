export type BestIdea = {
  id: number; // 게시글 id,
  branches: string[]; // 분야들
  title: string; // 제목
};

// IdeaCard 글 글쓴이 정보
type MemberResponse = {
  profileImageUrl: string;
  nickname: string;
  skills: string[];
};

export type Idea = {
  id: number;
  title: string; // 게시글 제목,
  introduce: string; // 게시글 본문,
  hitsCount: number; // 조회수,
  commentsCount: number; // 댓글 개수,
  likesCount: number; // 좋아요수,
  bookmarksCount: number; // 북마크 수,
  isBookmarked: boolean; // 현재 해당 게시글을 북마크했는지,
  createdAt: string; // 생성시각,
  memberResponse: MemberResponse; // 게시글 작성자,
  branches: string[]; // 분야,
  skillCategories: string[]; // 목적
};
