import { useMemberInfoQuery } from '../../Profile/hooks/queries/useMemberInfoQuery';
import useSignUpQuery from '../../SignUp/hooks/useSignUpQuery';
import { convertSelectedCheckbox, convertSelectedSkills } from '../service/convertProfileQuery';

const useProfileQuery = () => {
  const { mainSkills, detailSkills, skillLevels, regions, purposes } = useSignUpQuery();
  const my = useMemberInfoQuery();

  const mySkills = convertSelectedSkills(my.skills);
  const myPurposes = convertSelectedCheckbox(my.joinPurposes, purposes);

  return {
    mainSkills,
    detailSkills,
    skillLevels,
    regions,
    purposes,
    my: { ...my, ['skills']: mySkills, ['joinPurposes']: myPurposes },
  };
};

export default useProfileQuery;
