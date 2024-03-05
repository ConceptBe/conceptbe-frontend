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

export interface LoginResponse {
  accessToken: string;
  authMemberInformation: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
}
