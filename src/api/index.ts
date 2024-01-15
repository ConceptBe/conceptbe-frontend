import { http } from './http';
import { CheckMember } from '../types/login';
import { GetSignUp, PostSignUp } from '../types/signUp';

type OauthServerType = 'kakao' | 'naver';

export const getOauthKakao = (code: string) => {
  return http.get<string>(`/oauth/login/kakao?code=${code}`);
};

export const getOauthNaver = (code: string) => {
  return http.get<string>(`/NAVER?code=${code}`);
};

export const getLogin = (oauthServerType: OauthServerType, oauthId: string) => {
  return http.get<string>(`/oauth/${oauthServerType}/login?oauthId=${oauthId}`);
};

export const getIsMember = (oauthServerType: OauthServerType, code: string) => {
  return http.get<CheckMember>(`/oauth/${oauthServerType}/member?code=${code}`);
};

export const postSignUp = (payload: PostSignUp) => {
  return http.post<string>('/sign-up', payload);
};

export const getSingUp = () => {
  return http.get<GetSignUp>('/sign-up');
};
