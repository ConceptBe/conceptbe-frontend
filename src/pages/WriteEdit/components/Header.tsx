import styled from '@emotion/styled';
import { SVGHeaderCheck24, SVGHeaderUncheck24, Text } from 'concept-be-design-system';

import Back from '../../../layouts/Back';

type Props = {
  onClickCheckButton: () => void;
  isCheckButtonEnabled: boolean;
};

/**
 * 글쓰기 페이지 헤더
 * checkButton을 클릭해서 글을 작성한다.
 */
const Header = ({ onClickCheckButton, isCheckButtonEnabled }: Props) => {
  const handleClickCheckButton = () => {
    onClickCheckButton();
  };

  return (
    <HeaderBox>
      <Back />
      <Text font="suit16sb" color="b4">
        게시글 수정
      </Text>
      <button onClick={handleClickCheckButton}>
        {isCheckButtonEnabled ? <SVGHeaderCheck24 /> : <SVGHeaderUncheck24 />}
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
