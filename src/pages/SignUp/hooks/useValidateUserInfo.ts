import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useConfirm from '../../../hooks/useConfrim';
import { OauthMemberInfo } from '../../../types/login';

const useValidateUserInfo = (userInfo: OauthMemberInfo | null) => {
  const openConfirm = useConfirm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) return;

    (async () => {
      if (
        await openConfirm({
          content: '잘못된 접근 방식입니다. 로그인 이후 시도해 주세요.',
          confirmButtonContent: '로그인',
          closeButtonContent: '이전 페이지',
        })
      ) {
        navigate('/login');
        return;
      }

      navigate(-1);
    })();
  }, [userInfo, navigate, openConfirm]);
};

export default useValidateUserInfo;
