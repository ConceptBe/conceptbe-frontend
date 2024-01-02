import styled from '@emotion/styled';

import { ColorKeyType } from '../../../styles/theme';

interface Props {
  top?: number;
  bottom?: number;
  color?: ColorKeyType;
  height?: number;
}

const Divider = styled.hr<Props>`
  width: 100%;
  height: ${({ height }) => height || 1}px;
  margin-top: ${({ top }) => top}px;
  margin-bottom: ${({ bottom }) => bottom}px;
  border: none;
  background-color: ${({ theme, color: divideColor }) => (divideColor ? theme.color[divideColor] : theme.color.b)};
`;

export default Divider;
