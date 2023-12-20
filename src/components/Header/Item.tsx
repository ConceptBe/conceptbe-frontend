import { ElementType, ReactNode } from 'react';
interface HeaderItemProps {
  children: ReactNode;
  component?: ElementType;
}

export const Item = ({ children, component, ...props }: HeaderItemProps) => {
  const Element = component || 'div';
  return <Element {...props}>{children}</Element>;
};
