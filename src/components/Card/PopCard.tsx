import styled from '@emotion/styled';
import { Text, theme, PNGIdeaBackground1 } from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

interface IdeaCardProps {
  branch: string;
  title: string;
}

const PopCard = ({ branch, title }: IdeaCardProps) => {
  const navigate = useNavigate();

  return (
    <IdeaCardWrapper onClick={() => navigate('/feed/1')}>
      <img src={PNGIdeaBackground1} />
      <CardBoxBack />
      <CardBox>
        <Text style={{ fontSize: 13, fontWeight: 800 }} color="w1">
          {branch}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px' }} color="w1">
          {title}
        </Text>
      </CardBox>
    </IdeaCardWrapper>
  );
};

export default PopCard;

const IdeaCardWrapper = styled.div`
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
