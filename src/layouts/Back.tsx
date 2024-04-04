import styled from '@emotion/styled';
import { SVGHeaderBack24B, theme } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import useRouteMatched from '../hooks/useRouteMatch';

type Props = {
  confirmBeforeNavigate?: boolean;
};

const Back = ({ confirmBeforeNavigate = false }: Props) => {
  const { hasMatched } = useRouteMatched();
  const navigate = useNavigate();

  const isMatchedWhiteStyle = hasMatched('/feed/:id', '/profile-edit');

  const handleBackClick = () => {
    // confirmBeforeNavigate가 true일 경우, confirm 대화 상자 표시
    const shouldNavigate = confirmBeforeNavigate
      ? window.confirm('작업 내용이 저장되지 않습니다. 작성을 종료하시겠습니까?')
      : true;

    // 사용자가 OK를 클릭했다면 뒤로 가기
    if (shouldNavigate) {
      navigate(-1);
    }
  };

  return (
    <Wrapper onClick={handleBackClick} isWhiteStyle={isMatchedWhiteStyle}>
      <SVGHeaderBack24B />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isWhiteStyle: boolean }>`
  cursor: pointer;
  color: ${({ isWhiteStyle }) => isWhiteStyle && theme.color.w1};
`;

export default Back;
