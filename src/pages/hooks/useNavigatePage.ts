import { useNavigate } from 'react-router-dom';

const useNavigatePage = () => {
  const navigate = useNavigate();

  const goProfilePage = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const goLoginPage = () => {
    navigate('/login');
  };

  return { goProfilePage, goLoginPage };
};

export default useNavigatePage;
