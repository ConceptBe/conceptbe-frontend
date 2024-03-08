import { DetailSkills, ConvertedCheckboxOption } from '../types';

interface SelectedSkills {
  skillNames: string[];
  skillLevels: string[];
}

export const convertSelectedSkills = (selectedSkills: string[] | undefined, detailSkill: DetailSkills) => {
  if (!selectedSkills) {
    return [];
  }

  const detailSkillList = Object.values(detailSkill).reduce((acc, skill) => acc.concat(skill), []);
  const { skillNames, skillLevels } = selectedSkills.reduce(
    (acc: SelectedSkills, skill: string) => {
      const skillName = skill.split('_')[0];
      const skillLevel = skill.split('_')[1];

      return {
        skillNames: [...acc.skillNames, skillName],
        skillLevels: [...acc.skillLevels, skillLevel],
      };
    },
    { skillNames: [], skillLevels: [] },
  );

  return skillNames.map((skillName, idx) => {
    const skillId = detailSkillList.find((skill) => skill.name === skillName)?.id || 0;

    return { id: skillId, name: `${skillName}, ${skillLevels[idx]}` };
  });
};

export const convertSelectedCheckbox = (
  selectedPurposes: string[] | undefined,
  purposes: ConvertedCheckboxOption[],
) => {
  if (!selectedPurposes) {
    return [];
  }

  return purposes.map((purpose) => {
    const isChecked = selectedPurposes.some((purposeName) => purposeName === purpose.name);

    if (isChecked) {
      return {
        checked: true,
        id: purpose.id,
        name: purpose.name,
      };
    }

    return {
      checked: false,
      id: purpose.id,
      name: purpose.name,
    };
  });
};
