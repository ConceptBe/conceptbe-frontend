import styled from '@emotion/styled';

import { ReactComponent as SVGCancel } from '../../../assets/svg/x.svg';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';

interface TagProps {
  text: string;
  onDelete: (text: string) => void;
}

const Tag = ({ text, onDelete }: TagProps) => {
  return (
    <Wrapper>
      <Text font="suit13m" color="w1" customStyle={{ fontWeight: 400 }}>
        {text}
      </Text>
      <Spacer size={10} />
      <SVGWrapper onClick={() => onDelete(text)}>
        <SVGCancel />
      </SVGWrapper>
    </Wrapper>
  );
};

export default Tag;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.c1};
`;

const SVGWrapper = styled.div`
  color: ${({ theme }) => theme.color.w1};
  cursor: pointer;
`;
