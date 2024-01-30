import { useMutation } from '@tanstack/react-query';

import { _postSignUp } from '../../../api';

const useSignUpMutation = () => {
  const { mutate: postSignUp, ...rest } = useMutation({
    mutationFn: _postSignUp,
    onSuccess: (data) => {
      localStorage.setItem('userToken', data.accessToken);
    },
  });

  return { postSignUp, ...rest };
};

export default useSignUpMutation;
