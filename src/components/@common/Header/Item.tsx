import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type Props<T extends ElementType> = {
  children: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Item = <T extends ElementType>({ children, as, ...props }: Props<T>) => {
  const Tag = as || 'div';
  return <Tag {...props}>{children}</Tag>;
};
