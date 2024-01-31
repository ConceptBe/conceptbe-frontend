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
  commentParentResponses: CommentParentResponse[];
}

export interface CommentChildResponse {
  nickname: string;
  memberSkills: string[];
  content: string;
  likesCount: number;
}

export interface CommentParentResponse {
  nickname: string;
  memberSkills: string[];
  content: string;
  likesCount: number;
  commentCount: number;
  commentChildResponses: CommentChildResponse[];
}
