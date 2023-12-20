import styled from '@emotion/styled';
import { ReactNode, CSSProperties } from 'react';

interface TextProps {
  children: ReactNode;
  font: CSSProperties;
  color?: string;
}

const Text = ({ children, font, color }: TextProps) => {
  return (
    <TextBox color={color} style={{ ...font }}>
      {children}
    </TextBox>
  );
};

export default Text;

const TextBox = styled.p<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : props.theme.colors.b)};
`;
