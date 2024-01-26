import styled from '@emotion/styled';
import { SVGHeaderCheck24, Text } from 'concept-be-design-system';

import Back from '../../../../layouts/Back';

type Props = {
  onClickCheckButton: () => void;
};

const Header = ({ onClickCheckButton }: Props) => {
  return (
    <HeaderBox>
      <Back />
      <Text font="suit16sb" color="b4">
        글쓰기
      </Text>
      <button onClick={onClickCheckButton}>
        <SVGHeaderCheck24 />
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
