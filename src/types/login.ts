export interface CheckMember {
  isMember: boolean;
  oauthId: string;
  nickname: string;
  profileImageUrl: string;
  email: string;
  oauthServerType: string;
}

export interface SignUp {
  nickname: string;
  mainSkill: string;
  profileImageUrl: string;
  skills: string[];
  joinPurpose: string[];
  livingPlace?: string;
  workingPlace?: string;
  introduction?: string;
  email: string;
  oauthId: string;
  oauthServerType: string;
}
