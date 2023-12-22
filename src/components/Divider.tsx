import styled from '@emotion/styled';

interface IDivider {
  top?: number | string;
  bottom?: number | string;
  color?: string;
  height?: number;
}

const Divider = ({ top = 0, bottom = 0, color, height = 1 }: IDivider) => {
  return <SpacerBox top={top} bottom={bottom} color={color} height={height} />;
};

export default Divider;

const SpacerBox = styled.hr<IDivider>`
  width: 100%;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.top}px;
  margin-bottom: ${(props) => props.bottom}px;
  border: none;
  background-color: ${(props) => (props.color ? props.color : props.theme.colors.b)};
`;
