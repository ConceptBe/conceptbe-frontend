import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const getUserTokenInLocalStorage = () => localStorage.getItem('userToken');

const NeedAuth = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthored = !!getUserTokenInLocalStorage();

    if (!isAuthored) {
      navigate('/login');
    }
  });

  return <>{children}</>;
};

export default NeedAuth;
