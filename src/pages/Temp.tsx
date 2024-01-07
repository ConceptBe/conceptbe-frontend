import { Button } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

const Temp = () => {
  const navigate = useNavigate();
  return (
    <>
      <span>비로그인 임시 페이지입니다. 로그인을 시도하려면 아래 버튼을 누르세요.</span>
      <Button onClick={() => navigate('/')}>메인 페이지로</Button>
    </>
  );
};

export default Temp;
