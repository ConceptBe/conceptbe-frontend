import styled from '@emotion/styled';
import { useState, useCallback, ReactNode, ChangeEvent, cloneElement, Children } from 'react';

interface TabsProps {
  children: ReactNode;
  value?: number | string;
  onChange?: (event: ChangeEvent<HTMLButtonElement>, index: number | string) => void;
}

const Tabs = ({ children, value, onChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number | string>(value || 0);

  console.log('value', value);
  console.log('activeTab', activeTab);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLButtonElement>, index: number | string) => {
      setActiveTab(index);
      if (onChange) {
        onChange(event, index);
      }
    },
    [onChange, activeTab],
  );

  const tabs = Children.toArray(children).map((child: any, index: number) =>
    cloneElement(child, {
      key: index,
      active: activeTab === index,
      value: child.props.value ? child.props.value : index,
      onChange: (e: ChangeEvent<HTMLButtonElement>) => handleChange(e, index),
    }),
  );
  return <Container>{tabs}</Container>;
};

export default Tabs;

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.w1};
`;
