import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';

import Panel, { Item } from './Panel.tsx';
import { ReactComponent as Arrow } from '../../../assets/svg/arrow.svg';

interface DropdownProps {
  items: Item[];
  initialValue: string;
  onClick: (value: string) => void;
  disabled?: boolean;
  value: string;
}

const Dropdown = ({ items, initialValue, onClick, disabled, value }: DropdownProps) => {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedText, setSelectedText] = useState(initialValue);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    value === '' && setSelectedText(initialValue);
  }, [value, onClick]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={containerRef} onBlur={() => setIsActive(false)}>
      <Trigger disabled={disabled} onClick={!disabled ? toggleActive : () => {}}>
        {selectedText} <ArrowIcon disabled={disabled} isActive={isActive} />
      </Trigger>
      {isActive && (
        <Panel onClick={onClick} toggleActive={toggleActive} setSelectedText={setSelectedText} items={items} />
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div`
  position: relative;
`;

const ArrowIcon = styled(Arrow)<{ isActive: boolean; disabled?: boolean }>`
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
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.disabled : theme.colors.w1)};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.ba : theme.colors.b4)};
  border: 1px solid ${({ theme }) => theme.colors.l2};
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
`;
