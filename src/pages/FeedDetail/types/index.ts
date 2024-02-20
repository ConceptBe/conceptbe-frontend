export interface FeedDetailResponse {
  imageUrl: string;
  nickname: string;
  skillList: string[];
  title: string;
  date: Date;
  introduce: string;
  branchList: string[];
  purposeList: string[];
  cooperationWay: string;
  recruitmentPlace: string;
  teamRecruitmentsList: string[];
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  hits: number;
  owner: boolean;
  ownerScrap: boolean;
  ownerLike: boolean;
}

export interface CommentParentResponse {
  nickname: string;
  memberSkills: string[];
  content: string;
  likesCount: number;
  commentCount: number;
  commentChildResponses: CommentChildResponse[];
}

export interface CommentChildResponse {
  nickname: string;
  memberSkills: string[];
  content: string;
  likesCount: number;
}
