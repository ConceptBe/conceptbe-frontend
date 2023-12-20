import styled from '@emotion/styled';
import { ReactComponent as Check } from '../../assets/svg/active_check.svg';
import { ReactComponent as UnCheck } from '../../assets/svg/radio.svg';

export type checkboxOptions = { text: string; value: string; checked: boolean };

interface CheckboxProps {
  options: checkboxOptions[];
  onChange: (value: string, newState: boolean) => void;
}

const CheckBoxModal = ({ options, onChange }: CheckboxProps) => {
  return (
    <CheckBoxContainer>
      {options?.map((option) => (
        <CheckWrapper key={option.value}>
          <CheckboxLabel htmlFor={option.value} checked={option.checked}>
            {option.text}
            {option.checked ? <Check /> : <UnCheck />}
            <CheckboxInput
              id={option.value}
              name={option.value}
              type="checkbox"
              defaultChecked={option.checked}
              onChange={() => {
                onChange(option.value, option.checked);
              }}
            />
          </CheckboxLabel>
        </CheckWrapper>
      ))}
    </CheckBoxContainer>
  );
};

export default CheckBoxModal;

const CheckBoxContainer = styled.div``;

const CheckWrapper = styled.div`
  /* display: flex;
  justify-content: space-between;
  padding: 15px 22px; */
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label<{ checked: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 15px 22px;
  /* border: 1px solid red; */
  /* display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 16px 12px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.l2};
  border-radius: 6px;
  background-color: ${({ checked, theme }) => (checked ? theme.colors.c1 : theme.colors.w1)};
  color: ${({ checked, theme }) => (checked ? theme.colors.w1 : theme.colors.b4)};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer; */
`;
