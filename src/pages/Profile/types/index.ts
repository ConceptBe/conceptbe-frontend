export type Idea = {
  id: number;
  title: string; // 게시글 제목,
  introduce: string; // 게시글 본문,
  hitsCount: number; // 조회수,
  commentsCount: number; // 댓글 개수,
  likesCount: number; // 좋아요수,
  bookmarksCount: number; // 북마크 수,
  branches: string[]; // 분야,
  skillCategories: string[]; // 목적
};

export type MemberSkills = {
  skillId: number;
  skillName: string;
  level: string;
};

export type Member = {
  profileImageUrl: string; // 프로필 이미지,
  nickname: string; // 닉네임
  isMyProfile: boolean; // 내 프로필 여부
  mainSkill: string; // 주요 스킬
  livingPlace: string; // 지역
  workingPlace: string; // 직장명
  introduction: string; // 자기소개
  skills: MemberSkills[]; // 세부 스킬
  joinPurposes: string[]; // 관심 영역
};

export interface MemberResponse {
  id: number;
  profileImageUrl: string;
  nickname: string;
  skills: string[];
}
export interface BookmarkedIdea {
  id: number;
  title: string;
  introduce: string;
  hitsCount: number;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  isBookmarked: boolean;
  createdAt: string;
  memberResponse: MemberResponse;
  branches: string[];
  skillCategories: string[];
}
