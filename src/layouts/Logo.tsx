import styled from '@emotion/styled';
import { SVGHeaderMainLogo } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as SVGHeaderBetaLogo } from '../../public/assets/beta.svg';
import useRouteMatched from '../hooks/useRouteMatch';

const Logo = () => {
  const navigate = useNavigate();
  const { hasMatched } = useRouteMatched();
  const isMatchedFeed = hasMatched('/');

  const onClickLogo = () => {
    if (isMatchedFeed) {
      location.reload();
      return;
    }

    navigate('/');
  };

  return (
    <Wrapper onClick={onClickLogo}>
      <SVGHeaderMainLogo />
      <SVGHeaderBetaLogo />
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;
