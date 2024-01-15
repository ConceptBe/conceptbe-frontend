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

interface DetailSkillOption {
  id: number;
  name: string;
}

export interface CheckboxOption {
  id: number;
  name: string;
}
