export interface FeedDetailResponse {
  memberId: number;
  imageUrl: string;
  nickname: string;
  mainSkill: string;
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
  memberId: number;
  parentCommentId: string;
  nickname: string;
  profileImageUrl: string;
  mainSkill: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentCount: number;
  commentChildResponses: CommentChildResponse[];
  owner: boolean;
  deleted: boolean;
  likes: boolean;
}

export interface CommentChildResponse {
  memberId: number;
  childCommentId: string;
  nickname: string;
  profileImageUrl: string;
  mainSkill: string;
  content: string;
  createdAt: string;
  likesCount: number;
  owner: boolean;
  deleted: boolean;
  likes: boolean;
}
