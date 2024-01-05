import styled from '@emotion/styled';
import { ReactNode, CSSProperties, ElementType, ComponentPropsWithoutRef } from 'react';

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
  ...attributes
}: Props<T>) => {
  const tag = as || 'span';

  return (
    <Wrapper as={tag} textColor={color} textFont={font} style={{ ...customStyle }} {...attributes}>
      {children}
      {required && (
        <RequiredWrapper>
          <Required />
        </RequiredWrapper>
      )}
    </Wrapper>
  );
};

export const Wrapper = styled.span<{ textColor: ColorKeyType; textFont: FontKeyType }>`
  display: flex;
  user-select: none;
  flex-direction: row;
  color: ${({ theme, textColor }) => theme.color[textColor]};
  font-size: ${({ theme, textFont }) => theme.font[textFont].fontSize}px;
  font-weight: ${({ theme, textFont }) => theme.font[textFont].fontWeight};
`;

export const RequiredWrapper = styled.div`
  margin-left: 6px;
  display: flex;
  align-items: start;
`;

export default Text;
