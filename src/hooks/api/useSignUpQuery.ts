import { useQuery } from '@tanstack/react-query';

import { getDetailSkills, getMainSkills } from '../../api';
import convertCheckboxQuery from '../../service/convertCheckboxQuery';

const MAIN_SKILL_QUERY = [
  { id: 1, name: '기획' },
  { id: 2, name: '디자이너' },
  { id: 3, name: '개발자' },
  { id: 4, name: '데이터' },
  { id: 5, name: '마케팅/영업' },
  { id: 6, name: '미디어' },
];

const DETAIL_SKILL_QUERY: { [key: number]: { id: number; name: string }[] } = {
  1: [
    { id: 2, name: 'IT기획' },
    { id: 3, name: '게임기획' },
    { id: 4, name: '제품기획' },
    { id: 5, name: '사업기획' },
  ],
  2: [
    { id: 2, name: 'UXUI' },
    { id: 3, name: '게임디자인' },
    { id: 4, name: '캐릭터디자인' },
    { id: 5, name: '그림/일러스트' },
    { id: 6, name: '제품디자인' },
    { id: 7, name: '시각디자인' },
    { id: 8, name: '패션디자인' },
    { id: 9, name: '출판디자인' },
  ],
  3: [
    { id: 2, name: 'BE' },
    { id: 3, name: 'FE' },
    { id: 4, name: 'AOS' },
    { id: 5, name: 'IOS' },
    { id: 6, name: '퍼블리싱' },
    { id: 7, name: '서버개발' },
    { id: 8, name: '게임개발' },
  ],
  4: [
    { id: 2, name: '데이터엔지니어' },
    { id: 3, name: '데이터분석' },
  ],
  5: [
    { id: 2, name: '퍼포먼스마케팅' },
    { id: 3, name: '콘텐츠마케팅' },
    { id: 4, name: '광고/크리에이티브' },
    { id: 5, name: '브랜딩' },
    { id: 6, name: '세일즈' },
  ],
  6: [
    { id: 2, name: 'PD' },
    { id: 3, name: '작가' },
    { id: 4, name: '음악' },
    { id: 5, name: '영상촬영' },
    { id: 6, name: '영상편집' },
    { id: 7, name: '사진' },
  ],
};

const SKILL_DEPTH_THREE_LIST = [
  { id: 1, name: '상' },
  { id: 2, name: '중' },
  { id: 3, name: '하' },
];

const REGION_LIST = [
  { id: 1, name: '서울특별시' },
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

const CHECKBOX_LIST = [
  { id: 1, name: '사이드프로젝트' },
  { id: 2, name: '창업' },
  { id: 3, name: '크라우드펀딩' },
  { id: 4, name: '공모전' },
  { id: 5, name: '스터디' },
];

const useSignUpQuery = () => {
  // const { data: mainSkillQuery } = useQuery({
  //   queryKey: ['mainSkills'],
  //   queryFn: getMainSkills,
  // });
  // const { data: detailSkillQuery } = useQuery({
  //   queryKey: ['detailSkills'],
  //   queryFn: getDetailSkills,
  // });

  const convertedCheckboxQuery = convertCheckboxQuery(CHECKBOX_LIST);

  return {
    mainSkillQuery: MAIN_SKILL_QUERY,
    detailSkillQuery: DETAIL_SKILL_QUERY,
    skillLevelQuery: SKILL_DEPTH_THREE_LIST,
    regionQuery: REGION_LIST,
    checkboxQuery: convertedCheckboxQuery,
  };
};

export default useSignUpQuery;
