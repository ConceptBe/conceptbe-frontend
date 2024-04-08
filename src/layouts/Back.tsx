import styled from '@emotion/styled';
import { SVGHeaderBack24B, theme } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

import useConfirm from '../hooks/useConfrim';
import useRouteMatched from '../hooks/useRouteMatch';

type Props = {
  confirmBeforeNavigate?: boolean;
};

const Back = ({ confirmBeforeNavigate = false }: Props) => {
  const { hasMatched } = useRouteMatched();
  const openConfirm = useConfirm();
  const navigate = useNavigate();

  const isMatchedWhiteStyle = hasMatched('/feed/:id', '/profile-edit');

  const handleBackClick = async () => {
    // confirmBeforeNavigate가 true일 경우, confirm 대화 상자 표시
    if (confirmBeforeNavigate) {
      const shouldNavigate = await openConfirm({ content: '작업 내용이 저장되지 않습니다. 작성을 종료하시겠습니까?' });

      // 사용자가 취소를 클릭했다면 뒤로가기를 하지 않음
      if (shouldNavigate === false) return;
    }

    navigate(-1);
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
