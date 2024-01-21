import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';

import PopularIdeaCard from '../../../components/Card/PopularIdeaCard';
import { BestIdea } from '../../../hooks/queries/useBestIdeasQuery';

type Props = {
  bestIdeas: BestIdea[];
};

const PopularIdeaListSection = ({ bestIdeas }: Props) => {
  return (
    <FeedWrapper style={{ padding: '47px 0 0 22px' }}>
      <Text font="suit16sb" color="b4">
        현재 인기 있는 아이디어
      </Text>
      <Spacer size={18} />
      <FeedFixWrapper>
        {bestIdeas.map((bestIdea, idx) => (
          <PopularIdeaCard key={idx} branch={bestIdea.branches} title={bestIdea.title} />
        ))}
      </FeedFixWrapper>
    </FeedWrapper>
  );
};

export default PopularIdeaListSection;

const FeedWrapper = styled.div`
  padding-top: 47px;
`;

const FeedFixWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;
