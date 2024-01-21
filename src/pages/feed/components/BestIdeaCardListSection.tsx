import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';

import BestIdeaCard from '../../../components/Card/BestIdeaCard';
import { BestIdea } from '../../../hooks/queries/useBestIdeasQuery';

type Props = {
  bestIdeas: BestIdea[];
};

const BestIdeaCardListSection = ({ bestIdeas }: Props) => {
  return (
    <Wrapper>
      <Text font="suit16sb" color="b4">
        현재 인기 있는 아이디어
      </Text>
      <Spacer size={18} />
      <CardListWrapper>
        {bestIdeas.map((bestIdea, idx) => (
          <BestIdeaCard key={idx} branch={bestIdea.branches} title={bestIdea.title} />
        ))}
      </CardListWrapper>
    </Wrapper>
  );
};

export default BestIdeaCardListSection;

const Wrapper = styled.div`
  padding: 47px 0 0 22px;
`;

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;