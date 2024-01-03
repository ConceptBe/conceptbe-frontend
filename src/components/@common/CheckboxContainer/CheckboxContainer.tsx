import styled from '@emotion/styled';
import { ChangeEvent, Fragment } from 'react';

interface CheckboxOptions {
  text: string;
  value: string;
  checked: boolean;
}

interface Props {
  options: CheckboxOptions[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxContainer = ({ options, onChange }: Props) => {
  return (
    <Wrapper>
      {options.map((option) => (
        <Fragment key={option.value}>
          <CheckboxInput
            id={option.value}
            name={option.value}
            type="checkbox"
            defaultChecked={option.checked}
            onChange={onChange}
          />
          <CheckboxLabel htmlFor={option.value} checked={option.checked}>
            {option.text}
          </CheckboxLabel>
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default CheckboxContainer;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 16px 12px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.l2};
  border-radius: 6px;
  background-color: ${({ checked, theme }) => (checked ? theme.color.c1 : theme.color.w1)};
  color: ${({ checked, theme }) => (checked ? theme.color.w1 : theme.color.b4)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
