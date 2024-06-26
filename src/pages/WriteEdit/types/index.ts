// 글쓰기 요청 body 타입
export interface PutIdeasRequest {
  ideaId: number;
  idea: PutFormData;
}

export interface PutFormData extends FormData {
  request: {
    title: string; // 제목
    introduce: string; // 소개
    branchIds: number[]; // 분야
    purposeIds: number[]; // 목적
    cooperationWay: string; // 협업 방식
    recruitmentPlaceId: number; // 팀원 모집 지역
    skillCategoryIds: number[]; // 팀원 모집 종류
    imageIds: number[];
  };
  images: File[];
  // imageIds 에는 변경이 없는 image들의 id를 넣어줘야함
  // images에는 변경된 image file들을 넣어서 보내야함
}

// 글쓰기 필터 정보 타입
export type Info = {
  id: number;
  name: string;
};

export type Idea = {
  branches: Info[]; // 분야
  purposes: Info[]; // 목적
  regions: Info[]; // 팀원 모집 지역
  skillCategoryResponses: {
    // 팀원 모집 종류
    id: number;
    name: string; // 기획
    skillResponses: Info[]; // IT기획, 게임기획, 제품기획, 사업기획
  }[];
};

export interface ImageResponse {
  id: number;
  ideaId: number;
  imageUrl: string;
}

export type IdeaDetail = {
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
  ownerLike: boolean;
  ownerScrap: boolean;
  imageResponses: ImageResponse[];
};
