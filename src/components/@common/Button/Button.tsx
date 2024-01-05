import styled from '@emotion/styled';
import { CSSProperties, ComponentPropsWithoutRef, ReactNode, ElementType, MouseEventHandler } from 'react';

type Props<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isGrayOut?: boolean;
  customStyle?: CSSProperties;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType>({
  as,
  onClick = () => {},
  isGrayOut = false,
  customStyle,
  children,
  ...attributes
}: Props<T>) => {
  const tag = as || 'button';

  return (
    <Wrapper as={tag} onClick={onClick} style={customStyle} isGrayOut={isGrayOut} {...attributes}>
      {children}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button<{ isGrayOut: boolean }>`
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
