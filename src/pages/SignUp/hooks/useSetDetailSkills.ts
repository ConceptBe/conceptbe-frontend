import { useCallback, useEffect, useState } from 'react';

import { DetailSkillOption, MainSkillOption, Skill } from '../../../types/signUp';
import { DropdownValue } from '../types';

interface Props {
  mainSkills: Pick<MainSkillOption, 'id' | 'name'>[];
  detailSkills: DetailSkillOption[][];
  dropdownValue: DropdownValue;
  onResetDropdown: (value: keyof DropdownValue) => void;
}

const useSetDetailSkills = ({ mainSkills, detailSkills, dropdownValue, onResetDropdown }: Props) => {
  const [selectedSkillDepths, setSelectedSkillDepths] = useState<Skill[]>([]);
  const skillDepthOneId = mainSkills.find(({ name }) => name === dropdownValue.skillDepthOne)?.id;

  const onDeleteSkill = (value: string) => {
    setSelectedSkillDepths(selectedSkillDepths.filter(({ name }) => name !== value));
  };

  const onClickDropdownSetting = useCallback(() => {
    if (!skillDepthOneId) return;

    const selectedValue = `${dropdownValue.skillDepthTwo}, ${dropdownValue.skillDepthThree}`;
    const selectedId = detailSkills[skillDepthOneId].find(({ name }) => name === dropdownValue.skillDepthTwo)?.id;

    if (selectedId && selectedSkillDepths.length < 3) {
      setSelectedSkillDepths((prev) => [...prev, { id: selectedId, name: selectedValue }]);
      onResetDropdown('skillDepthOne');
      onResetDropdown('skillDepthTwo');
      onResetDropdown('skillDepthThree');
    }
  }, [detailSkills, skillDepthOneId, selectedSkillDepths, dropdownValue, onResetDropdown]);

  useEffect(() => {
    if (dropdownValue.skillDepthThree === '' || !dropdownValue.skillDepthTwo) return;

    onClickDropdownSetting();
  }, [dropdownValue, onClickDropdownSetting]);

  return {
    skillDepthOneId,
    selectedSkillDepths,
    onDeleteSkill,
  };
};

export default useSetDetailSkills;
