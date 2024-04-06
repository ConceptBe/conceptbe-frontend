import { useNavigate } from 'react-router-dom';

const useNavigatePage = () => {
  const navigate = useNavigate();

  const goFeedPage = () => {
    navigate('/');
  };

  const goProfilePage = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const goLoginPage = () => {
    navigate('/login');
  };

  return { goFeedPage, goProfilePage, goLoginPage };
};

export default useNavigatePage;
