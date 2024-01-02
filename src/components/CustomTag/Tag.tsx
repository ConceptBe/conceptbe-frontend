import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as Cross } from '../../assets/svg/x.svg';
import Spacer from '../@common/Spacer';
import Text from '../@common/Text/Text';
import UnStyleButton from '../UnStyleButton';

interface TagProps {
  text: string;
  onDelete?: () => void;
}

const Tag = ({ text, onDelete }: TagProps) => {
  return (
    <TagContainer>
      <Text font="suit13m" color="w1">
        {text}
      </Text>
      <Spacer size={10} />
      <UnStyleButton
        onClick={() => onDelete(text)}
        style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        <Cross color="w1" />
      </UnStyleButton>
    </TagContainer>
  );
};

export default Tag;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.c1};
`;
