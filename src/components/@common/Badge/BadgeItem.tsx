import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { ColorType } from '../../../styles/theme';

type BackgroundColorType = keyof Pick<ColorType, 'c1' | 'bg1'>;
type FontColorType = keyof Pick<ColorType, 'w1' | 'b4' | 'b9'>;

interface Props {
  children: ReactNode;
  backgroundColor?: BackgroundColorType;
  fontColor?: FontColorType;
}

const BadgeItem = ({ children, backgroundColor = 'bg1', fontColor = 'b9', ...attributes }: Props) => {
  return (
    <Wrapper backgroundColor={backgroundColor} fontColor={fontColor} {...attributes}>
      {children}
    </Wrapper>
  );
};

export default BadgeItem;

const Wrapper = styled.li<Required<Omit<Props, 'children'>>>`
  display: flex;
  align-items: center;
  height: 27px;
  background-color: ${({ theme, backgroundColor }) => theme.color[backgroundColor]};
  color: ${({ theme, fontColor }) => theme.color[fontColor]};
  font-size: 12px;
  font-weight: 500;
  padding: 0px 10px;
  border-radius: 4px;
`;
