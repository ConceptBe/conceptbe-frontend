import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIsMember, getOauthKaKao } from '../../api';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const getCode = useCallback(
    async (code: string | null) => {
      if (!code) throw new Error('OAUTH CODE ERROR');

      const { data } = await getIsMember('kakao', code);

      if (data.isMember) {
        const token = await getOauthKaKao(data.oauthMemberInformation.oauthId);
        localStorage.setItem('userToken', token);

        navigate('/');
        return;
      }

      navigate('/agreement', { state: data.oauthMemberInformation });
    },
    [navigate],
  );

  useEffect(() => {
    getCode(code);
  }, [code, getCode]);

  return <div>Loading...</div>;
};

export default KakaoRedirect;
