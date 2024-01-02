import { CSSProperties, ComponentPropsWithoutRef, ReactNode, ElementType, MouseEventHandler } from 'react';

import { Wrapper } from './Button.style';

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
}: Props<T>) => {
  const tag = as || 'button';

  return (
    <Wrapper as={tag} onClick={onClick} style={customStyle} isGrayOut={isGrayOut}>
      {children}
    </Wrapper>
  );
};

export default Button;
