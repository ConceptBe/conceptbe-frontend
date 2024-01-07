import styled from '@emotion/styled';
import { SVGMainLogo } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate('/')}>
      <SVGMainLogo />
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  cursor: pointer;
`;
