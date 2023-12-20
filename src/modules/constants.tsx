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
  { text: 'IT', value: 'it', checked: false },
  { text: '게임', value: 'game', checked: false },
  { text: '제품', value: 'product', checked: false },
  { text: '유튜브컨텐츠', value: 'youtube', checked: false },
  { text: '영화', value: 'movie', checked: false },
  { text: '웹툰', value: 'webtoon', checked: false },
];

// 필터 목적
const filterSubOptions = [
  { text: '사이드프로젝트', value: 'sideproject', checked: false },
  { text: '창업', value: 'founded', checked: false },
  { text: '크라우드펀딩', value: 'funding', checked: false },
  { text: '공모전', value: 'competition', checked: false },
  { text: '스터디', value: 'study', checked: false },
];

// 필터 협업방식
const filterRadio = [
  { text: '상관없음', value: 'all' },
  { text: '온라인', value: 'online' },
  { text: '오프라인', value: 'offline' },
];

export { memberSelect, memberSelectDetails, filterOptions, filterSubOptions, filterRadio };
