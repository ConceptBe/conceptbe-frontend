export type WorkingPlaceType = 'NO_MATTER' | 'ONLINE' | 'OFFLINE';

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
  profileImageUrl: string | null;
  skills: {
    skillId: number;
    level: string;
  }[];
  livingPlaceId: number;
  introduction: string | null;
  email: string;
  oauthId: string;
  oauthServerType: string;
  joinPurposes: number[];
}

export interface Skill {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

export interface GetSignUp {
  mainSkillResponses: MainSkillOption[];
  purposeResponses: CheckboxOption[];
  regionResponses: Region[];
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
