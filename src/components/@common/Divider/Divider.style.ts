import styled from '@emotion/styled';

import { ColorKeyType } from '../../../styles/theme';

interface Props {
  top: number;
  bottom: number;
  height: number;
  divideColor: ColorKeyType;
}

export const Wrapper = styled.hr<Props>`
  width: 100%;
  height: ${({ height }) => height}px;
  margin-top: ${({ top }) => top}px;
  margin-bottom: ${({ bottom }) => bottom}px;
  border: none;
  background-color: ${({ theme, divideColor }) => theme.color[divideColor]};
`;
