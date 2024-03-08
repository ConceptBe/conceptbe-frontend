import { CheckboxOption, MainSkillOption, DetailSkills } from '../SignUp/types';

export const convertSkillQuery = (options: MainSkillOption[] | undefined) => {
  const detailSkills: DetailSkills = {};

  if (!options) {
    return {
      mainSkills: [],
      detailSkills: {},
    };
  }

  options.forEach(({ id, detailSkillResponses }) => {
    detailSkills[id] = detailSkillResponses;
  });

  return {
    mainSkills: options.map(({ id, name }) => ({ id, name })),
    detailSkills,
  };
};

export const convertCheckboxQuery = (options: CheckboxOption[] | undefined) => {
  if (!options) {
    return [];
  }

  return options.map((option) => ({ ...option, checked: false }));
};
