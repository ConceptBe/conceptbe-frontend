import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../api/http';
import useAlert from '../../../hooks/useAlert';
import { PutSignUp } from '../types';

const _putProfile = (memberId: string, payload: PutSignUp) => http.put<void>(`/members/${memberId}`, payload);

const usePutProfileMutation = (memberId: string) => {
  const openAlert = useAlert();
  const { mutate: putProfile, ...rest } = useMutation({
    mutationFn: (payload: PutSignUp) => _putProfile(memberId, payload),
    onSuccess: () => {},
    onError: (error: AxiosError<{ message: string }>) => {
      openAlert({ content: error.response?.data.message ?? '필수 정보를 입력하지 않아 저장할 수 없습니다.' });
    },
  });

  return { putProfile, ...rest };
};

export default usePutProfileMutation;
