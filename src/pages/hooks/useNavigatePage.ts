import { useNavigate } from 'react-router-dom';

const useNavigatePage = () => {
  const navigate = useNavigate();

  const goProfilePage = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  return { goProfilePage };
};

export default useNavigatePage;
