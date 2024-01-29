import { CheckboxOption, MainSkillOption } from '../../../types/signUp';

export const convertSkillQuery = (options: MainSkillOption[] | undefined) => {
  if (!options) {
    return {
      mainSkillQuery: [],
      detailSkillQuery: [],
    };
  }

  return {
    mainSkillQuery: options.map(({ id, name }) => ({ id, name })),
    detailSkillQuery: options.map((option) => option.detailSkillResponses),
  };
};

export const convertCheckboxQuery = (options: CheckboxOption[] | undefined) => {
  if (!options) {
    return [];
  }

  return options.map((option) => ({ ...option, checked: false }));
};
