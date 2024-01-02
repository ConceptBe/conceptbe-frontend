import styled from '@emotion/styled';

interface Spacer {
  size: number;
}

const Spacer = styled.div<Spacer>`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
`;

export default Spacer;
