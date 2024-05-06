export type Idea = {
  id: number;
  title: string;
  introduce: string;
  hitsCount: number;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  branches: string[];
  skillCategories: string[];
};

export type MemberSkills = {
  skillId: number;
  skillName: string;
  level: string;
};

export type Member = {
  email: string;
  profileImageUrl: string;
  nickname: string;
  isMyProfile: boolean;
  mainSkill: string;
  livingPlace: string;
  workingPlace: string;
  introduction: string;
  skills: MemberSkills[];
  joinPurposes: string[];
};

export interface MemberResponse {
  id: number;
  profileImageUrl: string;
  nickname: string;
  mainSkill: string;
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
