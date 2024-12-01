import { WorkingPlaceType } from '../../SignUp/types';

// 글쓰기 요청 body 타입
export interface PostIdeasRequest extends FormData {
  request: {
    title: string; // 제목
    introduce: string; // 소개
    branchIds: number[]; // 분야
    purposeIds: number[]; // 목적
    cooperationWay: string; // 협업 방식
    recruitmentPlaceId: number; // 팀원 모집 지역
    skillCategoryIds: number[]; // 팀원 모집 종류
  };
  images: File[];
}

// 글쓰기 필터 정보 타입
export type Info = {
  id: number;
  name: string;
};

export type WrappedSkillInfo = {
  id: number;
  name: string;
  skillResponses: Info[];
};

export type WrappedBranchInfo = {
  id: number;
  name: string;
  branchResponses: Info[];
};

export type Idea = {
  purposesResponses: Info[];
  regionsResponses: Info[];
  branchesResponses: WrappedBranchInfo[];
  skillCategoryResponses: WrappedSkillInfo[];
};

export type NotificationDTO = {
  cooperationWays: WorkingPlaceType[];
  purposes: Info[];
  branches: WrappedBranchInfo[];
};
