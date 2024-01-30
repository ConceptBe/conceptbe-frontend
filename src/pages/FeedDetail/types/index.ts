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
  teamRecruitmentsList: string[];
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  hits: number;
  commentParentResponses: CommentParentResponse[];
}

interface CommentChildResponse {
  nickname: string;
  memberSkills: string[];
  content: string;
  likesCount: number;
}

interface CommentParentResponse {
  nickname: string;
  memberSkills: string[];
  content: string;
  likesCount: number;
  commentCount: number;
  commentChildResponses: CommentChildResponse[];
}