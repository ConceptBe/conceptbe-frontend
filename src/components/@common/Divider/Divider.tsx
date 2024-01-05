import styled from '@emotion/styled';

import { ColorKeyType } from '../../../styles/theme';
import { convertCSS } from '../@utils/convertCSS';

interface Props {
  width?: number | string;
  height?: number | string;
  top?: number | string;
  bottom?: number | string;
  color?: ColorKeyType;
}

const Divider = styled.hr<Props>`
  width: ${({ width }) => (width ? convertCSS(width) : '100%')};
  height: ${({ height }) => (height ? convertCSS(height) : 1)};
  margin-top: ${({ top }) => top && convertCSS(top)};
  margin-bottom: ${({ bottom }) => bottom && convertCSS(bottom)};
  border: none;
  background-color: ${({ theme, color: divideColor }) => (divideColor ? theme.color[divideColor] : theme.color.b)};
`;

export default Divider;
