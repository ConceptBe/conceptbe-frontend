import styled from '@emotion/styled';
import { ReactNode, CSSProperties } from 'react';

interface TextProps {
  children: ReactNode;
  font: CSSProperties;
  style?: CSSProperties;
  color?: string;
  required?: boolean;
}

const Text = ({ children, font, color, style, required = false }: TextProps) => {
  return (
    <TextBox color={color} style={{ ...font, ...style }}>
      {children}
      <RequiredBox required={required}>
        <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="#5F27FF" />
        </svg>
      </RequiredBox>
    </TextBox>
  );
};

export default Text;

const TextBox = styled.div<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : props.theme.colors.b)};
  display: flex;
  user-select: none;
  flex-direction: row;
`;

const RequiredBox = styled.div<{ required?: boolean }>`
  margin-left: 2px;
  display: ${(props) => (props.required ? 'flex' : 'none')};
  flex-direction: column;
  align-items: start;
`;
