import styled from '@emotion/styled';
import { SVGHeaderCheck24, SVGHeaderUncheck24, Text } from 'concept-be-design-system';

import Back from '../../../layouts/Back';

type Props = {
  onClickCheckButton: () => void;
  checkButtonDisabled: boolean;
};

/**
 * 글쓰기 페이지 헤더
 * checkButton을 클릭해서 글을 작성한다.
 */
const Header = ({ onClickCheckButton, checkButtonDisabled }: Props) => {
  const handleClickCheckButton = () => {
    if (checkButtonDisabled) {
      // TODO: 글쓰기 필수 조건 누락 시 토스트 띄워주기
      return;
    }

    onClickCheckButton();
  };

  return (
    <HeaderBox>
      <Back />
      <Text font="suit16sb" color="b4">
        글쓰기
      </Text>
      <button onClick={handleClickCheckButton}>
        {checkButtonDisabled ? <SVGHeaderUncheck24 /> : <SVGHeaderCheck24 />}
      </button>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  padding: 0 22px;
`;
