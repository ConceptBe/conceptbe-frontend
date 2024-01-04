import styled from '@emotion/styled';

import { Config, Validate } from '../@types/useInput';

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, config: Config) => void;
  onValidate?: () => Validate[];
  isSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
  autoFocus?: boolean;
  maxLength?: number;
  placeholder?: string;
  isRequired?: boolean;
}

const FieldTextarea = ({
  name,
  value,
  onChange,
  onValidate,
  isSuccess = true,
  successMessage = '',
  errorMessage = '',
  autoFocus = false,
  placeholder = '',
  maxLength,
  isRequired = false,
}: Props) => {
  return (
    <>
      <TextArea
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e, {
            isRequired,
            maxLength,
            onValidate,
          });
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
      />
      <MessageWrapper>
        {!errorMessage && isSuccess && value ? (
          <SuccessMessageWrapper>{successMessage}</SuccessMessageWrapper>
        ) : (
          <ErrorMessageWrapper>{errorMessage}</ErrorMessageWrapper>
        )}
      </MessageWrapper>
    </>
  );
};

export default FieldTextarea;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  border-radius: 6px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.color.l2};
  outline: none;
  color: ${({ theme }) => theme.color.b4};
  background: ${({ theme }) => theme.color.w1};

  &:focus {
    border-color: ${({ theme }) => theme.color.c1};
  }
`;

const MessageWrapper = styled.div`
  margin-top: 12px;
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  height: 15px;
`;

const ErrorMessageWrapper = styled.p`
  color: ${({ theme }) => theme.color.c3};
`;

const SuccessMessageWrapper = styled.p`
  color: ${({ theme }) => theme.color.c2};
`;
