import styled from '@emotion/styled';

import { ColorKeyType } from '../../../styles/theme';
import { convertCSS } from '../@utils/convertCSS';

interface Props {
  width?: number | string;
  height?: number | string;
  left?: number | string;
  right?: number | string;
  color?: ColorKeyType;
}

const TextDivider = styled.div<Props>`
  width: ${({ width }) => (width ? convertCSS(width) : '1px')};
  height: ${({ height }) => (height ? convertCSS(height) : '10px')};
  margin-left: ${({ left }) => left && convertCSS(left)};
  margin-right: ${({ right }) => right && convertCSS(right)};
  background-color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.b)};
`;

export default TextDivider;
