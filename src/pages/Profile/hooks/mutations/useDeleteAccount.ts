import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { http } from '../../../../api/http';
import useConfirm from '../../../../hooks/useConfirm';
import useNavigatePage from '../../../hooks/useNavigatePage';
import { getUserId } from '../../utils/getUserId';

const _deleteAccount = () => {
  const userId = getUserId();
  return http.delete(`/members/${userId}`);
};

type DeleteAccountError = AxiosError<{ message: string }>;

const useDeleteAccount = () => {
  const openConfirm = useConfirm();
  const { goFeedPage } = useNavigatePage();

  const { mutate: deleteAccount, ...rest } = useMutation({
    mutationFn: _deleteAccount,
    onSuccess: async () => {
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      await openConfirm({ content: '탈퇴하였습니다.', closeButtonContent: '' });
      goFeedPage();
    },
    onError: async (error: DeleteAccountError) => {
      await openConfirm({
        content: error.response?.data.message ?? '탈퇴에 실패했습니다. 메일로 문의 부탁드립니다.',
        closeButtonContent: '',
      });
    },
  });

  return { deleteAccount, ...rest };
};

export default useDeleteAccount;
