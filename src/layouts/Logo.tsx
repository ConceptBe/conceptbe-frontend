import styled from '@emotion/styled';
import { SVGHeaderMainLogo } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate('/')}>
      <SVGHeaderMainLogo />
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  cursor: pointer;
`;
