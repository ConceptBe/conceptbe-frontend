export interface SignUp {
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
