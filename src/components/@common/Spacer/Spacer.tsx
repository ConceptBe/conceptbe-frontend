import styled from '@emotion/styled';

interface Props {
  size: number;
}

const Spacer = styled.div<Props>`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
`;

export default Spacer;
