import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect } from 'react';

export interface Item {
  text: string;
  value: string;
  defaultValue?: boolean;
}

export interface PanelProps {
  items: Item[];
  setSelectedText: Dispatch<SetStateAction<string>>;
  toggleActive: () => void;
  onClick: (value: string) => void;
}

const Panel = ({ items, setSelectedText, toggleActive, onClick }: PanelProps) => {
  const handleItemClick = (value: string, text: string) => {
    onClick(value);
    toggleActive();
    setSelectedText(() => text);
  };
  return (
    <PanelWrapper>
      {items.map(({ text, value, defaultValue }) => (
        <PanelItem
          key={value}
          defaultValue={defaultValue}
          onClick={() => {
            !defaultValue ? handleItemClick(value, text) : null;
          }}
        >
          {text}
        </PanelItem>
      ))}
    </PanelWrapper>
  );
};

export default Panel;

const PanelWrapper = styled.ul`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(calc(100% + 5px));
  /* z-index: 100; */
  width: -webkit-fill-available;

  background-color: ${({ theme }) => theme.colors.w1};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  max-height: 125px;
  overflow: scroll;
  z-index: 1;
`;

const PanelItem = styled.li<{ defaultValue: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  padding: 11px 15px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.l3};
  cursor: ${({ defaultValue }) => (defaultValue ? 'auto' : 'pointer')};
  color: ${({ theme, defaultValue }) => (defaultValue ? theme.colors.b9 : theme.colors.b6)};
  font-size: 12px;
  font-weight: 400;

  &:last-child {
    border-bottom: none;
  }
`;
