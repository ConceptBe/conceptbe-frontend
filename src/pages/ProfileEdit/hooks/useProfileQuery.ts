import useMemberQuery from './useMemberQuery';
import { memberId } from '../../Profile/utils/memberId';
import useSignUpQuery from '../../SignUp/hooks/useSignUpQuery';
import { convertSelectedCheckbox, convertSelectedSkills } from '../service/convertProfileQuery';

const useProfileQuery = () => {
  const { mainSkills, detailSkills, skillLevels, regions, purposes } = useSignUpQuery();
  const { my } = useMemberQuery(memberId);

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
