import { ReactNode, CSSProperties, ElementType, ComponentPropsWithoutRef } from 'react';

import { RequiredWrapper, TextWrapper } from './Text.style';
import { ReactComponent as Required } from '../../../assets/svg/text_required.svg';
import { ColorKeyType, FontKeyType } from '../../../styles/theme';

type Props<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  font?: FontKeyType;
  color?: ColorKeyType;
  required?: boolean;
  customStyle?: CSSProperties;
} & ComponentPropsWithoutRef<T>;

const Text = <T extends ElementType>({
  as,
  children,
  font = 'suit14sm',
  color = 'b',
  customStyle,
  required = false,
}: Props<T>) => {
  const tag = as || 'span';

  return (
    <TextWrapper as={tag} textColor={color} textFont={font} style={{ ...customStyle }}>
      {children}
      {required && (
        <RequiredWrapper>
          <Required />
        </RequiredWrapper>
      )}
    </TextWrapper>
  );
};

export default Text;
