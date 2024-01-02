import styled from '@emotion/styled';

export const Wrapper = styled.button<{ isGrayOut: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isGrayOut, theme }) => (isGrayOut ? theme.color.bg1 : theme.color.c1)};
  color: ${({ isGrayOut, theme }) => (isGrayOut ? theme.color.b : theme.color.w1)};
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 17px 28px;
  cursor: pointer;
`;
