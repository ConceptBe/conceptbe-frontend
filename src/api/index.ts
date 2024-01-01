import { http } from './http';
import { CheckMember, SignUp } from '../types/login';

type OauthServerType = 'kakao' | 'naver';

export const getOauthKaKao = (code: string) => {
  return http.get<string>(`/oauth/login/kakao?code=${code}`);
};

export const getOauthNaver = (code: string) => {
  return http.get<string>(`/NAVER?code=${code}`);
};

export const getLogin = (oauthServerType: OauthServerType, oauthId: string) => {
  return http.get<string>(`/oauth/${oauthServerType}/login/${oauthId}`);
};

export const getIsMember = (oauthServerType: OauthServerType, code: string) => {
  return http.get<CheckMember>(`/oauth/${oauthServerType}/member?code=${code}`);
};

export const postSignUp = (payload: SignUp) => {
  return http.post<string>('/sign-up', payload);
};
