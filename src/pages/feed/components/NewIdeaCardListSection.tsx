import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';

import NewIdeaCard from '../../../components/Card/NewIdeaCard';
import { Idea } from '../../../hooks/queries/useIdeasQuery';

type Props = {
  ideas: Idea[];
};

const NewIdeaCardListSection = ({ ideas }: Props) => {
  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        피드 영역 타이틀입니다
      </Text>
      <Spacer size={20} />
      {ideas.map((idea, idx) => (
        <>
          <NewIdeaCard key={idx} idea={idea} />
          <Spacer size={20} />
        </>
      ))}
    </Wrapper>
  );
};

export default NewIdeaCardListSection;

const Wrapper = styled.div`
  padding: 47px 22px 0 22px;
`;
