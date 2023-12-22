import styled from '@emotion/styled';

export type checkboxOptions = { text: string; value: string; checked: boolean };
interface CheckboxProps {
  options: checkboxOptions[];
  onChange: (
    value: string,
    newState: boolean,
    setState: React.Dispatch<React.SetStateAction<checkboxOptions[]>>,
  ) => void;
  setState: React.Dispatch<React.SetStateAction<checkboxOptions[]>>;
}

const Checkbox = ({ options, onChange, setState }: CheckboxProps) => {
  return (
    <CheckboxWrapper>
      {options.map((option) => (
        <div key={option.value}>
          <CheckboxInput
            id={option.value}
            name={option.value}
            type="checkbox"
            defaultChecked={option.checked}
            onChange={() => {
              onChange(option.value, option.checked, setState);
            }}
          />
          <CheckboxLabel htmlFor={option.value} checked={option.checked}>
            {option.text}
          </CheckboxLabel>
          {option.checked}
        </div>
      ))}
    </CheckboxWrapper>
  );
};

export default Checkbox;

const CheckboxWrapper = styled.div`
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
  border: 1px solid ${({ theme }) => theme.colors.l2};
  border-radius: 6px;
  background-color: ${({ checked, theme }) => (checked ? theme.colors.c1 : theme.colors.w1)};
  color: ${({ checked, theme }) => (checked ? theme.colors.w1 : theme.colors.b4)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
