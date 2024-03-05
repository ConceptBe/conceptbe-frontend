import styled from '@emotion/styled';
import {
  Box,
  Flex,
  Text,
  Divider,
  SVGCancel,
  Spacer,
  SVGTripleDots,
  SVGFeedPencil,
  theme,
} from 'concept-be-design-system';

import useHandleModifyDropdown from '../hooks/useHandleModifyDropdown';

interface Props {
  owner: boolean;
}

const ModifyDropdown = ({ owner }: Props) => {
  const { dropdownRef, isOpenModifyDropdown, toggleModifyDropdown } = useHandleModifyDropdown();

  return (
    <>
      {owner ? (
        <Box position="relative" ref={dropdownRef} cursor="pointer">
          <SVGTripleDots onClick={toggleModifyDropdown} />
          {isOpenModifyDropdown && (
            <DropDownBox>
              <Flex justifyContent="space-between" alignItems="center">
                <Text font="suit12r" color="b6">
                  수정하기
                </Text>
                <SVGFeedPencil />
              </Flex>
              <Divider color="bg1" height={0.1} />
              <Flex justifyContent="space-between" alignItems="center">
                <Text font="suit12r" color="b6">
                  삭제하기
                </Text>
                <SVGCancel />
              </Flex>
            </DropDownBox>
          )}
        </Box>
      ) : (
        <Spacer size={24} />
      )}
    </>
  );
};

export default ModifyDropdown;

const DropDownBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${theme.color.w1};
  width: 88px;
  height: 70px;
  border-radius: 6px;
  padding: 10px;
  top: 40px;
  right: -6px;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.18);
`;