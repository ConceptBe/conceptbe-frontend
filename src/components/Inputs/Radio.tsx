import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

export type radioOptions = { text: string; value: string };
type gapType = 'small' | 'large';
interface RadioProps {
  defaultValue: string;
  options: radioOptions[];
  onChange: (selectedValue: string) => void;
  gap: gapType;
}
const Radio = ({ defaultValue, options, onChange, gap }: RadioProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <RadioWrapper>
      {options.map((option) => (
        <RadioInner key={option.value}>
          <RadioInput
            type="radio"
            id={option.value}
            name="radioOptions"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleOptionChange}
          />
          {selectedValue === option.value ? (
            <CheckedLabel htmlFor={option.value} gap={gap}>
              {option.text}
            </CheckedLabel>
          ) : (
            <UnCheckedLabel htmlFor={option.value} gap={gap}>
              {option.text}
            </UnCheckedLabel>
          )}
        </RadioInner>
      ))}
    </RadioWrapper>
  );
};

export default Radio;

const RadioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RadioInner = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioLabel = styled.label<{ gap: gapType }>`
  position: relative;
  padding-left: 28px;
  margin-right: ${({ gap }) => (gap === 'large' ? '30px' : '18px')};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

const CheckedLabel = styled(RadioLabel)`
  color: ${({ theme }) => theme.colors.b4};
  &::before {
    background-color: transparent;
    border: 1.5px solid ${({ theme }) => theme.colors.c1};
    box-sizing: border-box;
  }

  &::after {
    width: 12px;
    height: 12px;
    top: 5px;
    left: 5px;
    background-color: ${({ theme }) => theme.colors.c1};
  }
`;

const UnCheckedLabel = styled(RadioLabel)`
  color: ${({ theme }) => theme.colors.b4};
  &::before {
    background-color: ${({ theme }) => theme.colors.l2};
  }

  &::after {
    background-color: ${({ theme }) => theme.colors.w1};
  }
`;
