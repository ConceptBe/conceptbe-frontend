import styled from '@emotion/styled';

import { ColorKeyType, FontKeyType } from '../../../styles/theme';

export const TextWrapper = styled.span<{ textColor: ColorKeyType; textFont: FontKeyType }>`
  display: flex;
  user-select: none;
  flex-direction: row;
  color: ${({ theme, textColor }) => theme.color[textColor]};
  font-size: ${({ theme, textFont }) => theme.font[textFont].fontSize}px;
  font-weight: ${({ theme, textFont }) => theme.font[textFont].fontWeight};
`;

export const RequiredWrapper = styled.div`
  margin-left: 2px;
  display: flex;
  align-items: start;
`;
