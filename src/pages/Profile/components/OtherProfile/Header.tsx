import styled from '@emotion/styled';
import { Text } from 'concept-be-design-system';

import Back from '../../../../layouts/Back';

const Header = () => {
  return (
    <HeaderBox>
      <Back />
      <Text font="suit16sb" color="b4">
        프로필
      </Text>
      <EmptyIcon />
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  position: sticky;
  top: 0;

  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  padding: 0 22px;
`;

// "프로필" 텍스트를 중앙정렬 하기위한 빈 아이콘 공간
const EmptyIcon = styled.div`
  width: 24px;
  height: 24px;
`;
