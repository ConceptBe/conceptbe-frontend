export interface FeedDetailResponse {
  imageUrl: string;
  nickname: string;
  skillList: string[];
  title: string;
  date: string;
  introduce: string;
  branchList: string[];
  purposeList: string[];
  cooperationWay: string;
  recruitmentPlace: string;
  skillCategories: string[];
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  hits: number;
  owner: boolean;
  ownerScrap: boolean;
  ownerLike: boolean;
}

export interface CommentParentResponse {
  parentCommentId: string;
  nickname: string;
  profileImageUrl: string;
  memberSkills: string[];
  content: string;
  createdAt: string;
  likesCount: number;
  commentCount: number;
  commentChildResponses: CommentChildResponse[];
  owner: boolean;
  deleted: boolean;
}

export interface CommentChildResponse {
  childCommentId: string;
  nickname: string;
  profileImageUrl: string;
  memberSkills: string[];
  content: string;
  createAt: string;
  likesCount: number;
  owner: boolean;
  deleted: boolean;
}
