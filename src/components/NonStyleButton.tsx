import styled from '@emotion/styled';
import { ReactNode, forwardRef, ComponentPropsWithoutRef } from 'react';

// interface NonStyleButtonProp {
//   children: ReactNode;
//   onClick: () => void;
// }

type NonStyleButtonProp = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
};

const NonStyleButton = forwardRef<HTMLButtonElement, NonStyleButtonProp>(({ children, ...props }, ref) => {
  return (
    <NonStyledButton ref={ref} {...props}>
      {children}
    </NonStyledButton>
  );
});

export default NonStyleButton;

const NonStyledButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;
