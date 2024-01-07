export interface CheckMember {
  isMember: boolean;
  oauthMemberInformation: OauthMemberInfo;
}

export interface OauthMemberInfo {
  oauthId: string;
  oauthServerType: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
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
