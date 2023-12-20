import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  limit: number;
  isValid: boolean;
  onChange: (value: string) => void;
}

const InputWithLabel = ({ label, limit, value, placeholder, isValid, onChange }: InputProps) => {
  const [count, setCount] = useState(0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (count >= limit) {
      return;
    }
    setCount(e.target.value.length);
    onChange(e.target.value);
  };

  return (
    <div>
      <LabelWrapper>
        <Label>{label}</Label>
        <TextLimit>
          <Count>{count}</Count>/{limit}
        </TextLimit>
      </LabelWrapper>

      <Input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
      <ValidMessage isValid={isValid}>유효성 검사 메세지</ValidMessage>
    </div>
  );
};

export default InputWithLabel;

const LabelWrapper = styled.div`
  position: relative;
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
`;

const TextLimit = styled.div``;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.c1};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
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
