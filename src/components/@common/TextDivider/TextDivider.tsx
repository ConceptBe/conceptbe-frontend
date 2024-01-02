import styled from '@emotion/styled';

import { ColorKeyType } from '../../../styles/theme';

interface Props {
  width?: number;
  height?: number;
  left?: number;
  right?: number;
  color?: ColorKeyType;
}

const TextDivider = styled.div<Props>`
  width: ${({ width }) => width || 1}px;
  height: ${({ height }) => height || 10}px;
  margin-left: ${({ left }) => left}px;
  margin-right: ${({ right }) => right}px;
  background-color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.b)};
`;

export default TextDivider;
