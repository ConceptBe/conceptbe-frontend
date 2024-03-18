import styled from '@emotion/styled';
import {
  Text,
  theme,
  PNGIdeaBackground1,
  PNGIdeaBackground2,
  PNGIdeaBackground3,
  PNGIdeaBackground4,
  PNGIdeaBackground5,
  ImageView,
} from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  branches: string[];
  title: string;
  idx: number;
}

type IdeaBackgroundType = Record<number, string>;

const ideaBackground: IdeaBackgroundType = {
  0: PNGIdeaBackground1,
  1: PNGIdeaBackground2,
  2: PNGIdeaBackground3,
  3: PNGIdeaBackground4,
  4: PNGIdeaBackground5,
};

const BestIdeaCard = ({ id, branches, title, idx }: Props) => {
  const navigate = useNavigate();

  return (
    <BestIdeaCardWrapper onClick={() => navigate(`/feed/${id}`)}>
      <ImageView src={ideaBackground[idx % 5]} alt="인기 아이디어 이미지" />
      <CardBoxBack />
      <CardBox>
        <Text style={{ fontSize: 13, fontWeight: 800 }} color="w1">
          {branches.join(' | ')}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px' }} color="w1">
          {title}
        </Text>
      </CardBox>
    </BestIdeaCardWrapper>
  );
};

export default BestIdeaCard;

export const BestIdeaCardWrapper = styled.div`
  flex: 0 0 auto;
  border-radius: 8px;
  width: 140px;
  height: 180px;
  position: relative;
  overflow: hidden;
  background-color: ${theme.color.c1};
  cursor: pointer;
`;

const CardBoxBack = styled.div`
  opacity: 0.6;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
`;

const CardBox = styled.div`
  color: ${theme.color.w1};
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 15px 15px 15px;
  gap: 6px;
  word-wrap: break-word;
`;
