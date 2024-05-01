import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIsMember, getLogin } from '../../api';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  serverName: 'kakao' | 'naver';
}

const OauthRedirect = ({ serverName }: Props) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  console.log(code);

  const getCode = useCallback(
    async (code: string | null) => {
      if (!code) throw new Error('OAUTH CODE ERROR');

      const data = await getIsMember(serverName, code);

      if (data.isMember) {
        const { accessToken, authMemberInformation } = await getLogin(serverName, data.oauthMemberInformation.oauthId);
        localStorage.setItem('userToken', accessToken);
        localStorage.setItem('user', JSON.stringify(authMemberInformation));

        navigate('/');
        return;
      }

      navigate('/agreement', { state: data.oauthMemberInformation });
    },
    [serverName, navigate],
  );

  useEffect(() => {
    getCode(code);
  }, [code, getCode]);

  return <Spinner />;
};

export default OauthRedirect;
