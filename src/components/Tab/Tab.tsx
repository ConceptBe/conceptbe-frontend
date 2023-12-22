import styled from '@emotion/styled';
import { ForwardedRef, ReactNode, forwardRef } from 'react';

interface TabProps {
  children: ReactNode;
  active?: boolean;
  onChange?: () => void;
  value?: number | string;
}

const Tab = forwardRef(
  ({ children, active = false, value, onChange, ...props }: TabProps, ref: ForwardedRef<HTMLDivElement>) => {
    console.log('Tab =============', value, active);
    return (
      <Container ref={ref} active={active} value={value} onClick={onChange} {...props}>
        {children}
      </Container>
    );
  },
);

export default Tab;

const Container = styled.div<TabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  width: 100%;
  user-select: none;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, active }) => (active ? theme.colors.b : theme.colors.w1)};
  border-bottom-style: solid;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
