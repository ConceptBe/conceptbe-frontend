import styled from '@emotion/styled';
import { ReactNode } from 'react';

import BadgeItem from './BadgeItem';

interface Props {
  children: ReactNode;
}

const Badge = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

Badge.Item = BadgeItem;

export default Badge;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
