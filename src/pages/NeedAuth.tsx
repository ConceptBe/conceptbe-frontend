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
      navigate(to);
    }
  });

  return <>{children}</>;
}

export default NeedAuth;
