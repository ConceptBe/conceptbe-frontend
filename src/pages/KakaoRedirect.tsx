import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIsMember, getOauthKaKao } from '../api';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const getCode = useCallback(
    async (code: string | null) => {
      if (!code) throw new Error('CODE ERROR');

      console.log(code);

      const member = await getIsMember('kakao', code);

      if (member.isMember) {
        const token = await getOauthKaKao(member.oauthId);
        localStorage.setItem('userToken', token);

        navigate('/feed');
        return;
      }

      navigate('/sign-up');
    },
    [navigate],
  );

  useEffect(() => {
    console.log('hrer');
    getCode(code);
  }, [code, getCode]);

  return <div>Loading...</div>;
};

export default KakaoRedirect;
