import { DetailSkillOption } from '../../../types/signUp';

export interface DropdownValue {
  mainSkill: string;
  skillDepthOne: string;
  skillDepthTwo: string;
  skillDepthThree: string;
  region: string;
}

export interface DetailSkills {
  [key: number]: DetailSkillOption[];
}
