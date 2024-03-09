import styled from '@emotion/styled';
import { Divider, Text, theme } from 'concept-be-design-system';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as SVGPencil16 } from '../../assets/pencil16.svg';
import { ReactComponent as SVGX16 } from '../../assets/x16.svg';

type Props = {
  onClickEdit: () => void;
};

const ContentEditDropdown = ({ onClickEdit }: Props) => {
  const handleClickEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClickEdit();
  };

  return (
    <DropdownWrapper>
      <DropdownItem onClick={handleClickEdit}>
        <Text font="suit12r" color="b6">
          수정하기
        </Text>
        {/* TODO: 드롭다운에 쓰이는 연필, 삭제버튼 아이콘 디자인시스템에 추가 */}
        <SVGPencil16 />
      </DropdownItem>
      <Divider color="l3" />
      <DropdownItem>
        <Text font="suit12r" color="b6">
          삭제하기
        </Text>
        <SVGX16 />
      </DropdownItem>
    </DropdownWrapper>
  );
};

export default ContentEditDropdown;

const DropdownWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 1.5rem;
  right: 0;
  width: max-content;
  background-color: ${theme.color.w1};
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const DropdownItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.l2};
  }
`;
