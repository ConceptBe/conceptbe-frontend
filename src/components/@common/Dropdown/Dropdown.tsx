import styled from '@emotion/styled';
import { useState, useEffect, useCallback } from 'react';

import DropdownPanel from './DropdownPanel.tsx';
import { ReactComponent as SVGArrow } from '../../../assets/svg/arrow.svg';
import useHandleClickOutside from '../@hooks/useHandleClickOutside.ts';
import { DropdownItem } from '../@types/Dropdown.ts';

interface DropdownProps {
  items: DropdownItem[] | [];
  initialValue: string;
  onClick: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

const Dropdown = ({ items, initialValue, onClick, disabled, value = '' }: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedText, setSelectedText] = useState(initialValue);
  const { ref } = useHandleClickOutside(
    useCallback(() => {
      setIsActive(false);
    }, []),
  );

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const initText = (value: string, initialValue: string) => {
    value === '' && setSelectedText(initialValue);
  };

  useEffect(() => {
    if (typeof value === 'string') {
      initText(value, initialValue);
    }
  }, [value, initialValue]);

  return (
    <DropdownWrapper ref={ref} onBlur={() => setIsActive(false)}>
      <Trigger disabled={disabled} onClick={!disabled ? toggleActive : () => {}}>
        {selectedText}
        <ArrowWrapper isActive={isActive}>
          <SVGArrow />
        </ArrowWrapper>
      </Trigger>
      {isActive && (
        <DropdownPanel onClick={onClick} toggleActive={toggleActive} setSelectedText={setSelectedText} items={items} />
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div`
  position: relative;
`;

const ArrowWrapper = styled.div<{ isActive: boolean }>`
  width: min-content;
  height: 16px;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0)')};
`;

const Trigger = styled.div<{ disabled?: boolean }>`
  display: flex;
  user-select: none;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 500;
  box-sizing: border-box;
  gap: 10px;
  background-color: ${({ theme, disabled }) => (disabled ? theme.color.disabled : theme.color.w1)};
  color: ${({ theme, disabled }) => (disabled ? theme.color.ba : theme.color.b4)};
  border: 1px solid ${({ theme }) => theme.color.l2};
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
`;
