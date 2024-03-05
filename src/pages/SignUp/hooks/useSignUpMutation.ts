import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { _postSignUp } from '../../../api';

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { mutate: postSignUp, ...rest } = useMutation({
    mutationFn: _postSignUp,
    onSuccess: (data) => {
      localStorage.setItem('userToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.authMemberInformation));

      navigate('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? '필수 정보를 입력하지 않아 저장할 수 없습니다.');
    },
  });

  return { postSignUp, ...rest };
};

export default useSignUpMutation;
