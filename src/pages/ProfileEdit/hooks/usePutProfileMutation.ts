import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { http } from '../../../api/http';
import { PutSignUp } from '../types';

const updateUserNickname = (newNickname: string) => {
  const userInfo = JSON.parse(localStorage.getItem('user') ?? '{}');
  userInfo.nickname = newNickname;
  localStorage.setItem('user', JSON.stringify(userInfo));
};

const _putProfile = (memberId: string, payload: PutSignUp) => http.put<void>(`/members/${memberId}`, payload);

const usePutProfileMutation = (memberId: string, newNickname: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: putProfile, ...rest } = useMutation({
    mutationFn: (payload: PutSignUp) => _putProfile(memberId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members', 'detail', memberId] });
      updateUserNickname(newNickname);
      navigate(`/profile/${memberId}`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      // TODO: #54 머지 이후 Alert 컴포넌트 사용
      alert(error.response?.data.message ?? '필수 정보를 입력하지 않아 저장할 수 없습니다.');
    },
  });

  return { putProfile, ...rest };
};

export default usePutProfileMutation;
