import { useCallback, useEffect, useState } from 'react';

import { DetailSkills, DropdownValue, MainSkillOption, Skill } from '../types';

interface Props {
  initialValue?: Skill[];
  mainSkills: Pick<MainSkillOption, 'id' | 'name'>[];
  detailSkills: DetailSkills;
  dropdownValue: DropdownValue;
  onResetDropdown: (value: keyof DropdownValue) => void;
}

const useSetDetailSkills = ({ initialValue = [], mainSkills, detailSkills, dropdownValue, onResetDropdown }: Props) => {
  const [selectedSkillDepths, setSelectedSkillDepths] = useState<Skill[]>(initialValue);
  const skillDepthOneId = mainSkills.find(({ name }) => name === dropdownValue.skillDepthOne)?.id;

  const onDeleteSkill = useCallback((value: string) => {
    setSelectedSkillDepths((prevSkillDepths) => prevSkillDepths.filter(({ name }) => name !== value));
  }, []);

  const resetSkillDropdowns = useCallback(() => {
    onResetDropdown('skillDepthOne');
    onResetDropdown('skillDepthTwo');
    onResetDropdown('skillDepthThree');
  }, [onResetDropdown]);

  const onClickDropdownSetting = useCallback(() => {
    if (!skillDepthOneId) return;

    const selectedValue = `${dropdownValue.skillDepthTwo}, ${dropdownValue.skillDepthThree}`;
    const selectedId = detailSkills[skillDepthOneId].find(({ name }) => name === dropdownValue.skillDepthTwo)?.id;

    if (selectedSkillDepths.map(({ name }) => name).includes(selectedValue)) {
      alert('세부 스킬은 중복될 수 없습니다.');
      resetSkillDropdowns();
      return;
    }

    if (selectedId && selectedSkillDepths.length < 3) {
      setSelectedSkillDepths((prev) => [...prev, { id: selectedId, name: selectedValue }]);
      resetSkillDropdowns();
    }
  }, [detailSkills, skillDepthOneId, selectedSkillDepths, dropdownValue, resetSkillDropdowns]);

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
