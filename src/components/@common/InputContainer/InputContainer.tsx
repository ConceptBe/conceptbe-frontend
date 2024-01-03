import styled from '@emotion/styled';

import { ReactComponent as SVGRequired } from '../../../assets/svg/text_required.svg';
import { OnChangeConfig, Validate } from '../@types/useForm';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, config: OnChangeConfig) => void;
  onValidate?: () => Validate[];
  isSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
  autoFocus?: boolean;
  maxLength?: number;
  placeholder?: string;
  isLabelRequired?: boolean;
}

const InputContainer = ({
  label,
  name,
  value,
  onChange,
  onValidate,
  isSuccess = true,
  successMessage = '',
  errorMessage = '',
  autoFocus = false,
  maxLength = 0,
  placeholder = '',
  isLabelRequired = false,
}: InputProps) => {
  return (
    <>
      <LabelWrapper>
        <Label>
          {label}
          {isLabelRequired && (
            <SVGRequiredWrapper>
              <SVGRequired />
            </SVGRequiredWrapper>
          )}
        </Label>
        {maxLength > 0 && (
          <div>
            <LabelLength>{value.length}</LabelLength>
            <LabelLengthLimit>/{maxLength}</LabelLengthLimit>
          </div>
        )}
      </LabelWrapper>

      <Input
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e, {
            isRequired: isLabelRequired,
            maxLength,
            onValidate,
          });
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        errorMessage={errorMessage}
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

export default InputContainer;

const LabelWrapper = styled.div`
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
  color: ${({ theme }) => theme.color.b9};
  padding-right: 10px;
  position: relative;
`;

const SVGRequiredWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
`;

const LabelLength = styled.span`
  color: ${({ theme }) => theme.color.c1};
`;

const LabelLengthLimit = styled.span`
  color: ${({ theme }) => theme.color.b9};
`;

const Input = styled.input<{ errorMessage: string }>`
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border-radius: 6px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${({ errorMessage, theme }) => (errorMessage ? theme.color.c3 : theme.color.l2)};
  outline: none;
  color: ${({ theme }) => theme.color.b4};
  background: ${({ theme }) => theme.color.w1};

  &:focus {
    border-color: ${({ theme }) => theme.color.c1};
  }
`;

// const TextArea = styled.textarea`
//   box-sizing: border-box;
//   width: 100%;
//   height: 100px;
//   border-radius: 6px;
//   padding: 11px 16px;
//   font-size: 14px;
//   font-weight: 400;
//   border: 1px solid ${({ theme }) => theme.color.l2};
//   outline: none;
//   color: ${({ theme }) => theme.color.b4};
//   background: ${({ theme }) => theme.color.w1};

//   &:focus {
//     border-color: ${({ theme }) => theme.color.c1};
//   }
// `;

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
