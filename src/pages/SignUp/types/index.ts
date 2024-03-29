export interface DropdownValue {
  mainSkill: string;
  skillDepthOne: string;
  skillDepthTwo: string;
  skillDepthThree: string;
  region: string;
}

export type DetailSkills = Record<number, DetailSkillOption[]>;

export interface PostSignUp {
  nickname: string;
  mainSkillId: number;
  profileImageUrl: string;
  skills: {
    skillId: number;
    level: string;
  }[];
  joinPurposes: number[];
  livingPlace?: string;
  workingPlace?: string;
  introduction?: string;
  email: string;
  oauthId: string;
  oauthServerType: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface GetSignUp {
  mainSkillResponses: MainSkillOption[];
  purposeResponses: CheckboxOption[];
}

export interface MainSkillOption {
  id: number;
  name: string;
  detailSkillResponses: DetailSkillOption[];
}

export interface DetailSkillOption {
  id: number;
  name: string;
}

export interface CheckboxOption {
  id: number;
  name: string;
}

export interface FieldValue {
  nickname: string;
  company: string;
  intro: string;
}
