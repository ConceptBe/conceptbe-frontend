import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  withAuth: boolean;
  to?: string;
}

const getUserTokenInLocalStorage = () => localStorage.getItem('userToken');

function NeedAuth({ children, withAuth, to = '/login' }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorization: boolean = getUserTokenInLocalStorage() !== null;

    if (withAuth && !isAuthorization) {
      if (confirm('로그인이 필요한 페이지입니다. 로그인 하시겠습니까?')) navigate(to);
      else navigate('/temp');
    }
  });

  return <>{children}</>;
}

export default NeedAuth;
