export interface DropdownValue {
  mainSkill: string;
  skillDepthOne: string;
  skillDepthTwo: string;
  skillDepthThree: string;
  region: string;
}

export type DetailSkills = Record<number, DetailSkillOption[]>;

export interface PutSignUp {
  nickname: string;
  mainSkillId: number;
  profileImageUrl: string | null;
  skills: Omit<ProfileSkill, 'skillName'>[];
  livingPlaceId: number;
  introduction: string | null;
  joinPurposes: number[];
}

export interface ProfileSkill {
  skillId: number;
  skillName: string;
  level: string;
}

export interface SignUpSkill {
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

export interface ConvertedCheckboxOption {
  checked: boolean;
  id: number;
  name: string;
}

export interface FieldValue {
  nickname: string;
  company: string;
  intro: string;
}

export interface Profile {
  profileImageUrl: string;
  nickname: string;
  isMyProfile: boolean;
  mainSkill: string;
  livingPlace: string;
  workingPlace: string;
  introduction: string;
  skills: ProfileSkill[];
  joinPurposes: string[];
}
