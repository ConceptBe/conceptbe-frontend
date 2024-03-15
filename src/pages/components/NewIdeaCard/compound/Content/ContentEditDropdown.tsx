import styled from '@emotion/styled';
import { Divider, Text, theme, SVGFeedPencil, SVGCancel } from 'concept-be-design-system';
import { MouseEventHandler } from 'react';

type Props = {
  onClickEdit: () => void;
  onClickDelete?: () => void;
};

const ContentEditDropdown = ({ onClickEdit, onClickDelete }: Props) => {
  const handleClickEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClickEdit();
  };

  const handleClickDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClickDelete?.();
  };

  return (
    <DropdownWrapper>
      <DropdownItem onClick={handleClickEdit}>
        <Text font="suit12r" color="b6">
          수정하기
        </Text>
        {/* TODO: 드롭다운에 쓰이는 연필, 삭제버튼 아이콘 디자인시스템에 추가 */}
        <SVGFeedPencil />
      </DropdownItem>
      <Divider color="l3" />
      <DropdownItem onClick={handleClickDelete}>
        <Text font="suit12r" color="b6">
          삭제하기
        </Text>
        <SVGCancel />
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
