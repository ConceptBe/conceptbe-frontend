import { useNavigate } from 'react-router-dom';

import { ReactComponent as SVGLogo } from '../../../assets/svg/main_logo.svg';

const Logo = () => {
  const navigate = useNavigate();

  return <SVGLogo onClick={() => navigate('/')} cursor="pointer" />;
};

export default Logo;
