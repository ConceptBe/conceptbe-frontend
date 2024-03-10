import styled from '@emotion/styled';
import { SVGHeaderBack24B, theme } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import useRouteMatched from '../hooks/useRouteMatch';

const Back = () => {
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();

  const isMatchedWhiteStyle = hasMatched('/feed/:id');

  return (
    <Wrapper onClick={() => navigate(-1)} isWhiteStyle={isMatchedWhiteStyle}>
      <SVGHeaderBack24B />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isWhiteStyle: boolean }>`
  cursor: pointer;
  color: ${({ isWhiteStyle }) => isWhiteStyle && theme.color.w1};
`;

export default Back;
