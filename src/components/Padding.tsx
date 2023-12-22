import styled from '@emotion/styled';

interface PaddingProps {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

const Padding = ({ top, left, right, bottom }: PaddingProps) => {
  return <SpacerBox top={top} left={left} right={right} bottom={bottom} />;
};

export default Padding;

const SpacerBox = styled.div<PaddingProps>`
  padding-top: ${(props) => props.top}px;
  padding-bottom: ${(props) => props.bottom}px;
  padding-left: ${(props) => props.left}px;
  padding-right: ${(props) => props.right}px;
`;
