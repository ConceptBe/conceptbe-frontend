import { ConvertedCheckboxOption, ProfileSkill } from '../types';

export const convertSelectedSkills = (selectedSkills: ProfileSkill[] | undefined) => {
  if (!selectedSkills) {
    return [];
  }

  return selectedSkills.map((skill) => ({ id: skill.skillId, name: `${skill.skillName}, ${skill.level}` }));
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
