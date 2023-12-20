import styled from '@emotion/styled';

interface ButtonProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
  style?: React.CSSProperties;
}
const Button = ({ text, onClick, isActive, style }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} style={style} isActive={isActive}>
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.c1 : theme.colors.bg1)};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.w1 : theme.colors.b)};
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 17px 28px;
  cursor: pointer;
`;
