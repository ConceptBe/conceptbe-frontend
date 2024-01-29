import { useMutation } from '@tanstack/react-query';

import { postSignUp } from '../../../api';

const useSignUpMutation = () => {
  const { mutate: mutateSignUp, ...rest } = useMutation({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      localStorage.setItem('userToken', data.accessToken);
    },
  });

  return { mutateSignUp, ...rest };
};

export default useSignUpMutation;
