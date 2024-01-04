import styled from '@emotion/styled';
import { ReactNode } from 'react';

import FieldInput from './FieldInput';
import FieldTextarea from './FieldTextarea';
import { ReactComponent as SVGRequired } from '../../../assets/svg/text_required.svg';

interface InputProps {
  children: ReactNode;
  label: string;
  value: string;
  maxLength?: number;
  isRequired?: boolean;
}

const Field = ({ label, value, maxLength, isRequired = false, children }: InputProps) => {
  return (
    <>
      <LabelWrapper>
        <Label>
          {label}
          {isRequired && (
            <SVGRequiredWrapper>
              <SVGRequired />
            </SVGRequiredWrapper>
          )}
        </Label>
        {maxLength && (
          <div>
            <LabelLength>{value.length}</LabelLength>
            <LabelLengthLimit>/{maxLength}</LabelLengthLimit>
          </div>
        )}
      </LabelWrapper>
      {children}
    </>
  );
};

Field.Input = FieldInput;
Field.Textarea = FieldTextarea;

export default Field;

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
