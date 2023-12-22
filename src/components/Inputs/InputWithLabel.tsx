import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

import { ReactComponent as Dot } from '../../assets/svg/dot.svg';

interface InputProps {
  multiline?: boolean;
  label: string;
  value: string;
  validValue?: boolean;
  placeholder: string;
  limit: number;
  isValid: boolean;
  message?: string;
  hideMessage?: boolean;
  onChange: (value: string) => void;
  required?: boolean;
}

const InputWithLabel = ({
  multiline = false,
  label,
  limit,
  value,
  validValue = false,
  placeholder,
  isValid,
  message,
  hideMessage,
  onChange,
  required,
}: InputProps) => {
  const [count, setCount] = useState(0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 특수문자 제거
    const sanitizedValue = inputValue.replace(/[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/g, '');

    if (sanitizedValue.length > limit) {
      inputValue = sanitizedValue.substring(0, limit);
    } else {
      inputValue = sanitizedValue;
    }

    setCount(inputValue.length);

    if (validValue) {
      onChange(inputValue);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <LabelWrapper>
        <Label>
          {label}
          {required && (
            <DotWrapper>
              <Dot />
            </DotWrapper>
          )}
        </Label>
        <TextLimit>
          <Count>{count}</Count>
          <MaxCount>/{limit}</MaxCount>
        </TextLimit>
      </LabelWrapper>

      {multiline ? (
        <TextArea value={value} onChange={handleChange} placeholder={placeholder} maxLength={limit} />
      ) : (
        <Input type="text" value={value} onChange={handleChange} placeholder={placeholder} maxLength={limit} />
      )}
      {!hideMessage && <ValidMessage isValid={isValid}>{message}</ValidMessage>}
    </div>
  );
};

export default InputWithLabel;

const LabelWrapper = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  padding-bottom: 12px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.b9};
  padding-right: 10px;
  position: relative;
`;

const DotWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
`;

const TextLimit = styled.div``;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.c1};
`;

const MaxCount = styled.span`
  color: ${({ theme }) => theme.colors.b9};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border-radius: 6px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.l2};
  outline: none;
  color: ${({ theme }) => theme.colors.b4};
  background: ${({ theme }) => theme.colors.w1};

  &:focus {
    border-color: ${({ theme }) => theme.colors.c1};
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border-radius: 6px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.l2};
  outline: none;
  color: ${({ theme }) => theme.colors.b4};
  background: ${({ theme }) => theme.colors.w1};

  &:focus {
    border-color: ${({ theme }) => theme.colors.c1};
  }
`;

const ValidMessage = styled.p<{ isValid: boolean }>`
  padding-top: 12px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ isValid }) => (isValid ? '#0FC341' : '#E84C4C')};
`;
