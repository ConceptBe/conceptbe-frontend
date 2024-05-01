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
  memberId: number | null;
  parentCommentId: string;
  nickname: string | null;
  profileImageUrl: string | null;
  memberMainSkill: string | null;
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
  memberId: number | null;
  childCommentId: string;
  nickname: string | null;
  profileImageUrl: string | null;
  mainSkill: string | null;
  content: string;
  createdAt: string;
  likesCount: number;
  owner: boolean;
  deleted: boolean;
  likes: boolean;
}
