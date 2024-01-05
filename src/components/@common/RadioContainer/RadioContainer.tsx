import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

type GapType = 'small' | 'large';

interface RadioOptions {
  text: string;
  value: string;
  checked: boolean;
}
interface Props {
  nameKey: string;
  options: RadioOptions[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gap?: GapType;
}

const RadioContainer = ({ nameKey, options, onChange, gap = 'small' }: Props) => {
  return (
    <Wrapper>
      {options.map((option) => (
        <RadioWrapper key={option.value}>
          <RadioInput
            type="radio"
            id={option.value}
            name={nameKey}
            value={option.value}
            checked={option.checked}
            onChange={onChange}
          />
          {option.checked ? (
            <CheckedLabel htmlFor={option.value} gap={gap}>
              {option.text}
            </CheckedLabel>
          ) : (
            <UnCheckedLabel htmlFor={option.value} gap={gap}>
              {option.text}
            </UnCheckedLabel>
          )}
        </RadioWrapper>
      ))}
    </Wrapper>
  );
};

export default RadioContainer;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioLabel = styled.label<{ gap: GapType }>`
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
  color: ${({ theme }) => theme.color.b4};
  &::before {
    background-color: transparent;
    border: 1.5px solid ${({ theme }) => theme.color.c1};
    box-sizing: border-box;
  }

  &::after {
    width: 12px;
    height: 12px;
    top: 5px;
    left: 5px;
    background-color: ${({ theme }) => theme.color.c1};
  }
`;

const UnCheckedLabel = styled(RadioLabel)`
  color: ${({ theme }) => theme.color.b4};
  &::before {
    background-color: ${({ theme }) => theme.color.l2};
  }

  &::after {
    background-color: ${({ theme }) => theme.color.w1};
  }
`;
