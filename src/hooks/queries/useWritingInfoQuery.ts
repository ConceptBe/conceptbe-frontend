import { useSuspenseQuery } from '@tanstack/react-query';

import { http } from '../../api/http';

// 목데이터: 추후 쿼리로 받아오기
// 분야
const branches = [
  { id: 1, name: 'IT' },
  { id: 2, name: '게임' },
  { id: 3, name: '제품' },
  { id: 4, name: '유튜브컨텐츠' },
  { id: 5, name: '영화' },
  { id: 6, name: '웹툰' },
];

// 목적
const purposes = [
  { id: 1, name: '사이드프로젝트' },
  { id: 2, name: '창업' },
  { id: 3, name: '크라우드펀딩' },
  { id: 4, name: '공모전' },
  { id: 5, name: '스터디' },
];

// 모집 지역
const places = [
  { id: 1, name: '전국' },
  { id: 2, name: '부산광역시' },
  { id: 3, name: '대구광역시' },
  { id: 4, name: '인천광역시' },
  { id: 5, name: '광주광역시' },
  { id: 6, name: '울산광역시' },
  { id: 7, name: '세종특별자치시' },
  { id: 8, name: '경기도' },
  { id: 9, name: '강원특별자치도' },
  { id: 10, name: '충청북도' },
  { id: 11, name: '충청남도' },
  { id: 12, name: '전라북도' },
  { id: 13, name: '전라남도' },
  { id: 14, name: '경상북도' },
  { id: 15, name: '경상남도' },
  { id: 16, name: '제주특별자치도' },
];

// 팀원 모집
const teamRecruitments = [
  {
    name: '기획',
    teamRecruitments: [
      { id: 1, name: 'IT기획' },
      { id: 2, name: '게임기획' },
      { id: 3, name: '제품기획' },
      { id: 4, name: '사업기획' },
    ],
  },
  {
    name: '개발',
    teamRecruitments: [
      { id: 5, name: '웹개발' },
      { id: 6, name: '앱개발' },
      { id: 7, name: '게임개발' },
    ],
  },
  {
    name: '디자인',
    teamRecruitments: [
      { id: 8, name: 'UI/UX' },
      { id: 9, name: '그래픽' },
      { id: 10, name: '웹디자인' },
      { id: 11, name: '영상/모션' },
    ],
  },
  {
    name: '기타',
    teamRecruitments: [
      { id: 12, name: '마케팅' },
      { id: 13, name: '번역' },
      { id: 14, name: '콘텐츠' },
      { id: 15, name: '기획' },
    ],
  },
];

type Info = {
  id: number;
  name: string;
};

type Idea = {
  branches: Info[]; // 분야
  purposes: Info[]; // 목적
  regions: Info[]; // 팀원 모집 지역
  teamRecruitmentsCategories: {
    // 팀원 모집 종류
    name: string; // 기획
    teamRecruitments: Info[]; // IT기획, 게임기획, 제품기획, 사업기획
  }[];
};

const getWritingInfo = async () => {
  // TODO:: return http.get<Idea[]>('/ideas/writing');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const writingInfo: Idea = {
    branches,
    purposes,
    regions: places,
    teamRecruitmentsCategories: teamRecruitments,
  };

  return writingInfo;
};

export const useWritingInfoQuery = () => {
  const { data: writingInfo, ...rest } = useSuspenseQuery({ queryKey: ['writingInfo'], queryFn: getWritingInfo });

  const { branches, purposes, regions: recruitmentPlaces, teamRecruitmentsCategories: teamRecruitments } = writingInfo;

  return {
    branches,
    purposes,
    recruitmentPlaces,
    teamRecruitments,
    ...rest,
  };
};
