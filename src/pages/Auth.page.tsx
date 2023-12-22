import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthKakao, AuthKakaoMe } from '../api/api';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('token');
    // const code = '153|cedo5aLrogn9O6Aho8doRRhqflzN5Wh6o2SneEjvccf38969';
    AuthKakaoMe(code)
      .then((res) => {
        console.log('res', res);
        navigate('/feed');
      })
      .catch((err) => {
        console.log('err', err);
        navigate('/login');
      });
  }, []);
  return <div>Loading...</div>;
};

export default Auth;
