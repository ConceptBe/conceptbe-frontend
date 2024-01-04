import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

import { DropdownItem } from '../@types/Dropdown';

export interface PanelProps {
  items: DropdownItem[];
  setSelectedText: Dispatch<SetStateAction<string>>;
  toggleActive: () => void;
  onClick: (value: string) => void;
}

const DropdownPanel = ({ items, setSelectedText, toggleActive, onClick }: PanelProps) => {
  const handleItemClick = (value: string, text: string) => {
    onClick(value);
    toggleActive();
    setSelectedText(() => text);
  };

  return (
    <PanelWrapper>
      {items.map(({ text, value, placeValue }) => (
        <PanelItem
          key={value}
          value={value}
          placeValue={placeValue}
          onClick={() => {
            !placeValue ? handleItemClick(value, text) : null;
          }}
        >
          {text}
        </PanelItem>
      ))}
    </PanelWrapper>
  );
};

export default DropdownPanel;

const PanelWrapper = styled.ul`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(calc(100% + 5px));
  width: -webkit-fill-available;

  background-color: ${({ theme }) => theme.color.w1};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  max-height: 125px;
  overflow: scroll;
  z-index: 1;
`;

const PanelItem = styled.li<{ placeValue?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  padding: 11px 15px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.l3};
  cursor: ${({ placeValue }) => (placeValue ? 'auto' : 'pointer')};
  color: ${({ theme, placeValue }) => (placeValue ? theme.color.b9 : theme.color.b6)};
  font-size: 12px;
  font-weight: 400;

  &:last-child {
    border-bottom: none;
  }
`;
