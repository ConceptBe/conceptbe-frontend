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
      await openConfirm({
        content: '회원 탈퇴를 완료했습니다. 그간 서비스를 이용해 주셔서 감사합니다.',
        closeButtonContent: '',
      });
      goFeedPage();
    },
    onError: async (error: DeleteAccountError) => {
      await openConfirm({
        content:
          error.response?.data.message ?? '회원 탈퇴를 실패했습니다. 기타 문의 사항을 클릭해 메일로 문의해 주세요.',
        closeButtonContent: '',
      });
    },
  });

  return { deleteAccount, ...rest };
};

export default useDeleteAccount;
