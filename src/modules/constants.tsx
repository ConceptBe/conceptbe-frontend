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

// 프로필 설정
// 스킬 1뎁스
const skillOneDepth = [
  { text: '대분류', value: '', defaultValue: true },
  { text: '기획', value: 'product' },
  { text: '디자이너', value: 'designer' },
  { text: '개발자', value: 'developer' },
  { text: '데이터', value: 'data' },
  { text: '마케팅/영업', value: 'marketing' },
  { text: '미디어', value: 'media' },
];

// 스킬 2뎁스
const skillTwoDepth = {
  product: [
    { text: '상세분류', value: '', defaultValue: true },
    { text: 'IT기획', value: 'IT기획' },
    { text: '게임기획', value: '게임기획' },
    { text: '제품기획', value: '제품기획' },
    { text: '사업기획', value: '사업기획' },
  ],
  designer: [
    { text: '상세분류', value: '', defaultValue: true },
    { text: 'UXUI', value: 'UXUI' },
    { text: '게임디자인', value: '게임디자인' },
    { text: '캐릭터디자인', value: '캐릭터디자인' },
    { text: '그림/일러스트', value: '그림/일러스트' },
    { text: '제품디자인', value: '제품디자인' },
    { text: '시각디자인', value: '시각디자인' },
    { text: '패션디자인', value: '패션디자인' },
    { text: '출판디자인', value: '출판디자인' },
  ],
  developer: [
    { text: '상세분류', value: '', defaultValue: true },
    { text: 'BE', value: 'BE' },
    { text: 'FE', value: 'FE' },
    { text: 'AOS', value: 'AOS' },
    { text: 'IOS', value: 'IOS' },
    { text: '퍼블리싱', value: '퍼블리싱' },
    { text: '서버개발', value: '서버개발' },
    { text: '게임개발', value: '게임개발' },
  ],
  data: [
    { text: '상세분류', value: '', defaultValue: true },
    { text: '데이터엔지니어', value: '데이터엔지니어' },
    { text: '데이터분석', value: '데이터분석' },
  ],
  marketing: [
    { text: '상세분류', value: '', defaultValue: true },
    { text: '퍼포먼스마케팅', value: '퍼포먼스마케팅' },
    { text: '콘텐츠마케팅', value: '콘텐츠마케팅' },
    { text: '광고/크리에이티브', value: '광고/크리에이티브' },
    { text: '브랜딩', value: '브랜딩' },
    { text: '세일즈', value: '세일즈' },
  ],
  media: [
    { text: '상세분류', value: '', defaultValue: true },
    { text: 'PD', value: 'PD' },
    { text: '작가', value: '작가' },
    { text: '음악', value: '음악' },
    { text: '영상촬영', value: '영상촬영' },
    { text: '영상편집', value: '영상편집' },
    { text: '사진', value: '사진' },
  ],
};

const regionOptions = [
  { text: '서울특별시', value: '서울특별시' },
  { text: '부산광역시', value: '부산광역시' },
  { text: '대구광역시', value: '대구광역시' },
  { text: '인천광역시', value: '인천광역시' },
  { text: '광주광역시', value: '광주광역시' },
  { text: '울산광역시', value: '울산광역시' },
  { text: '세종특별자치시', value: '세종특별자치시' },
  { text: '경기도', value: '경기도' },
  { text: '강원특별자치도', value: '강원특별자치도' },
  { text: '충청북도', value: '충청북도' },
  { text: '충청남도', value: '충청남도' },
  { text: '전라북도', value: '전라북도' },
  { text: '전라남도', value: '전라남도' },
  { text: '경상북도', value: '경상북도' },
  { text: '경상남도', value: '경상남도' },
  { text: '제주특별자치도', value: '제주특별자치도' },
];

export {
  memberSelect,
  memberSelectDetails,
  filterOptions,
  filterSubOptions,
  filterRadio,
  skillOneDepth,
  skillTwoDepth,
  regionOptions,
};
