import { http } from './http';
import { CheckMember, SignUp } from '../types/login';

export const getLoginKaKao = (code: string) => {
  return http.get<string>(`/oauth/login/kakao?code=${code}`);
};

export const getLoginNaver = (code: string) => {
  return http.get<string>(`/NAVER?code=${code}`);
};

export const getIsMember = (oauthServerType: 'kakao' | 'naver') => {
  return http.get<CheckMember>(`/oauth/${oauthServerType}/member`);
};

export const postSignUp = (payload: SignUp) => {
  return http.post<string>('/sign-up', payload);
};
