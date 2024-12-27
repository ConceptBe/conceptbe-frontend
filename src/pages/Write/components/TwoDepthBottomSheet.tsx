import styled from '@emotion/styled';
import { BottomSheet, SVGCancel, SVGHeaderCheck24, Text, theme } from 'concept-be-design-system';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TwoDepthBottomSheet = ({ title, isOpen, onClose, children }: PropsWithChildren<Props>) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Sheet_TopBox>
        <SVGCancel width={24} height={24} onClick={onClose} cursor="pointer" />
        <Text font="suit16sb" color="b4">
          {title}
        </Text>
        <SVGHeaderCheck24 onClick={onClose} cursor="pointer" />
      </Sheet_TopBox>
      <Sheet_BodyBox>{children}</Sheet_BodyBox>
    </BottomSheet>
  );
};

const Sheet_TopBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  padding: 0 22px;
`;

const Sheet_BodyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Sheet_Left = styled.div`
  width: 38%;
  cursor: pointer;
`;

export const Sheet_leftItem = styled.div<{ checked: boolean }>`
  padding: 10px 22px;

  background-color: ${({ checked }) => (checked ? '' : theme.color.bg1)};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  height: 34px;
`;

export const Sheet_right = styled.div`
  width: 62%;
  box-sizing: border-box;
  padding: 0 22px;

  & > div:first-of-type {
    & > span {
      color: ${theme.color.c1};
    }
  }
`;

export const Sheet_radioDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 54px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
