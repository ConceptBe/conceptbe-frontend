import styled from '@emotion/styled';

interface ITextDivider {
  margin?: number | string;
  color?: string;
}

const TextDivider = ({ margin, color }: ITextDivider) => {
  return <SpacerBox margin={margin} color={color} />;
};

export default TextDivider;

const SpacerBox = styled.div<ITextDivider>`
  width: 1px;
  height: 10px;
  margin-left: ${(props) => props.margin}px;
  background-color: ${(props) => (props.color ? props.color : props.theme.colors.b)};
  margin-right: ${(props) => props.margin}px;
`;
