import { useMutation } from '@tanstack/react-query';
import { http } from '../../../api/http';
import useAlert from '../../../hooks/useAlert';
import { WorkingPlaceType } from '../types';

interface Payload {
  purposeIds: number[];
  branchIds: number[];
  cooperationWay: WorkingPlaceType;
}

const _postNotificationSettings = async (payload: Payload) => {
  await http.post('/notification-setting', payload);
};

export const useNotificationSettingsMutation = () => {
  const openAlert = useAlert();

  const { mutate: postNotificationSettings } = useMutation({
    mutationFn: (payload: Payload) => _postNotificationSettings(payload),
    onSuccess: () => {
      openAlert({ content: '프로필 설정이 완료되었습니다.' });
    },
    onError: () => {
      openAlert({ content: '프로필 설정에 실패하였습니다.' });
    },
  });

  return { postNotificationSettings };
};
