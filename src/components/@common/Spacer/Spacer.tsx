import styled from '@emotion/styled';

import { convertCSS } from '../@utils/convertCSS';

interface Props {
  size: number | string;
}

const Spacer = styled.div<Props>`
  min-width: ${({ size }) => size && convertCSS(size)};
  min-height: ${({ size }) => size && convertCSS(size)};
`;

export default Spacer;
