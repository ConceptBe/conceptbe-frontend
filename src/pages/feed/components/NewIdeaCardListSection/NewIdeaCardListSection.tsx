import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';
import { Fragment } from 'react';

import NewIdeaCard from '../../../../components/Card/NewIdeaCard/NewIdeaCard';
import { useIdeasQuery } from '../../../../hooks/queries/useIdeasQuery';

const NewIdeaCardListSection = () => {
  const { ideas } = useIdeasQuery();

  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        피드 영역 타이틀입니다
      </Text>
      <Spacer size={20} />
      {ideas.map((idea, idx) => (
        <Fragment key={idx}>
          <NewIdeaCard key={idx} idea={idea} />
          <Spacer size={20} />
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default NewIdeaCardListSection;

export const Wrapper = styled.div`
  padding: 47px 22px 0 22px;
`;
