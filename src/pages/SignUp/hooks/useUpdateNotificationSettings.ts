import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { http } from '../../../api/http';
import useAlert from '../../../hooks/useAlert';
import useConfirm from '../../../hooks/useConfirm';
import { WorkingPlaceType } from '../types';

interface Payload {
  purposeIds: number[];
  branchIds: number[];
  cooperationWay: WorkingPlaceType;
}

const _patchNotificationSettings = async (memberId: number, payload: Payload) => {
  await http.patch(`/notification-setting/${memberId}`, payload);
};

export const useUpdateNotificationSettings = (memberId: number) => {
  const openAlert = useAlert();
  const openConfirm = useConfirm();
  const navigate = useNavigate();

  const { mutate: patchNotificationSettings } = useMutation({
    mutationFn: (payload: Payload) => _patchNotificationSettings(memberId, payload),
    onSuccess: () => {
      openConfirm({
        content: '프로필 설정이 완료되었습니다.',
        closeButtonContent: '',
        onConfirm: () => navigate(`/profile/${memberId}`),
      });
    },
    onError: () => {
      openAlert({ content: '프로필 설정에 실패하였습니다.' });
    },
  });

  return { patchNotificationSettings };
};
