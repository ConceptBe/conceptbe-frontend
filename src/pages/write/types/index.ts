// 글쓰기 요청 body 타입
export type PostIdeasRequest = {
  title: string; // 제목
  introduce: string; // 소개
  branchIds: number[]; // 분야
  purposeIds: number[]; // 목적
  cooperationWay: string; // 협업 방식
  recruitmentPlace: number; // 팀원 모집 지역
  teamRecruitmentIds: number[]; // 팀원 모집 종류
};

// 글쓰기 필터 정보 타입
export type Info = {
  id: number;
  name: string;
};

export type Idea = {
  branches: Info[]; // 분야
  purposes: Info[]; // 목적
  regions: Info[]; // 팀원 모집 지역
  teamRecruitmentCategories: {
    // 팀원 모집 종류
    name: string; // 기획
    teamRecruitmentResponses: Info[]; // IT기획, 게임기획, 제품기획, 사업기획
  }[];
};
