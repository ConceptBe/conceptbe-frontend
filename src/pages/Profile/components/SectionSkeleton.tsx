import styled from '@emotion/styled';
import { Box, Skeleton, Spacer } from 'concept-be-design-system';

const SectionSkeleton = () => {
  return (
    <Wrapper>
      <CardSkeleton width="331px" height="220px" />
      <Spacer size={20} />
      <CardSkeleton width="331px" height="220px" />
      <Spacer size={20} />
      <CardSkeleton width="331px" height="220px" />
    </Wrapper>
  );
};

export default SectionSkeleton;

const Wrapper = styled(Box)`
  max-width: 335px;
  margin: 0 auto;

  @media (max-width: 375px) {
    margin: 0;
  }
`;

const CardSkeleton = styled(Skeleton)`
  @media (max-width: 375px) {
    width: 100%;
  }
`;
