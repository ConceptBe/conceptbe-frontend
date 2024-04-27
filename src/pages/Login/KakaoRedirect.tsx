import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIsMember, getLogin } from '../../api';
import Spinner from '../../components/Spinner/Spinner';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const getCode = useCallback(
    async (code: string | null) => {
      if (!code) throw new Error('OAUTH CODE ERROR');

      const data = await getIsMember('kakao', code);

      if (data.isMember) {
        const { accessToken, authMemberInformation } = await getLogin('kakao', data.oauthMemberInformation.oauthId);
        localStorage.setItem('userToken', accessToken);
        localStorage.setItem('user', JSON.stringify(authMemberInformation));

        queryClient.refetchQueries({ queryKey: ['ideas'] });

        navigate('/');
        return;
      }

      navigate('/agreement', { state: data.oauthMemberInformation });
    },
    [navigate, queryClient],
  );

  useEffect(() => {
    getCode(code);
  }, [code, getCode]);

  return <Spinner />;
};

export default KakaoRedirect;
