// 멤버 선택 대분류
const memberSelect = [
  { text: '기획', value: '기획' },
  { text: '디자인', value: '디자인' },
  { text: '개발', value: '개발' },
  { text: '데이터', value: '데이터' },
  { text: '마케팅/영업', value: '마케팅/영업' },
  { text: '미디어', value: '미디어' },
];

// 멤버 선택 소분류
const memberSelectDetails = [
  {
    parent: '기획',
    options: [
      { text: 'IT 기획', value: 'IT기획', checked: false },
      { text: '게임 기획', value: '게임기획', checked: false },
      { text: '제품 기획', value: '제품기획', checked: false },
      { text: '사업 기획', value: '사업기획', checked: false },
    ],
  },
  {
    parent: '디자인',
    options: [
      { text: 'UIUX', value: 'UIUX', checked: false },
      { text: '게임 디자인', value: '게임 디자인', checked: false },
      { text: '영상 디자인', value: '영상 디자인', checked: false },
      { text: '제품 디자인', value: '제품 디자인', checked: false },
      { text: '시각 디자인', value: '시각 디자인', checked: false },
      { text: '패션 디자인', value: '패션 디자인', checked: false },
      { text: '편집 디자인', value: '편집 디자인', checked: false },
      { text: '브랜딩 디자인', value: '브랜딩 디자인', checked: false },
      { text: '캐릭터/일러스트', value: '캐릭터/일러스트', checked: false },
    ],
  },
  {
    parent: '개발',
    options: [
      { text: 'BE', value: 'BE', checked: false },
      { text: 'FE', value: 'FE', checked: false },
      { text: 'AOS', value: 'AOS', checked: false },
      { text: 'IOS', value: 'IOS', checked: false },
    ],
  },
];

// ----------- 필터 부분 -------------------

// 필터 분야
const filterOptions = [
  { name: 'IT', id: 1, checked: false },
  { name: '게임', id: 2, checked: false },
  { name: '제품', id: 3, checked: false },
  { name: '유튜브컨텐츠', id: 4, checked: false },
  { name: '영화', id: 5, checked: false },
  { name: '웹툰', id: 6, checked: false },
];

// 필터 목적
const filterSubOptions = [
  { id: 1, name: '사이드프로젝트', checked: false },
  { id: 2, name: '창업', checked: false },
  { id: 3, name: '크라우드펀딩', checked: false },
  { id: 4, name: '공모전', checked: false },
  { id: 5, name: '스터디', checked: false },
];

// 필터 협업방식
const filterRadio = [
  { name: '상관없음', id: 1, checked: false },
  { name: '온라인', id: 2, checked: false },
  { name: '오프라인', id: 3, checked: false },
];

// 프로필 설정

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

export {
  MAIN_SKILL_QUERY,
  DETAIL_SKILL_QUERY,
  SKILL_DEPTH_THREE_LIST,
  REGION_LIST,
  CHECKBOX_LIST,
  memberSelect,
  memberSelectDetails,
  filterOptions,
  filterSubOptions,
  filterRadio,
};
