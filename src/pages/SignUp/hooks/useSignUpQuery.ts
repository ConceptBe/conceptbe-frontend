import { useSuspenseQuery } from '@tanstack/react-query';

import { getSingUp } from '../../../api';
import { convertCheckboxQuery, convertSkillQuery } from '../service/convertSignUpQuery';

const SKILL_DEPTH_THREE_LIST = [
  { id: 1, name: '상' },
  { id: 2, name: '중' },
  { id: 3, name: '하' },
];

const useSignUpQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['GetSignUp'],
    queryFn: getSingUp,
    select: (data) => {
      const { mainSkills, detailSkills } = convertSkillQuery(data.mainSkillResponses);
      const purposes = convertCheckboxQuery(data.purposeResponses);

      return {
        mainSkills,
        detailSkills,
        skillLevels: SKILL_DEPTH_THREE_LIST,
        regions: data.regionResponses,
        purposes,
      };
    },
  });

  return data;
};

export default useSignUpQuery;
