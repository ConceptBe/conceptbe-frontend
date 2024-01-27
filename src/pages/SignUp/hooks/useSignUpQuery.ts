import { useSuspenseQuery } from '@tanstack/react-query';

import { getSingUp } from '../../../api';
import { convertCheckboxQuery, convertSkillQuery } from '../../../service/convertSignUpQuery';

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

const useSignUpQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['GetSignUp'],
    queryFn: getSingUp,
  });

  const { mainSkillQuery, detailSkillQuery } = convertSkillQuery(data.mainSkillResponses);
  const checkboxQuery = convertCheckboxQuery(data.purposeResponses);

  return {
    mainSkillQuery,
    detailSkillQuery,
    skillLevelQuery: SKILL_DEPTH_THREE_LIST,
    regionQuery: REGION_LIST,
    checkboxQuery,
  };
};

export default useSignUpQuery;
