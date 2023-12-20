import styled from '@emotion/styled';
import IdeaBack from '../../assets/images/idea_back.png';

interface IdeaCardProps {
  category: string;
  title: string;
  image?: string;
}

const PopCard = ({ category, title, image }: IdeaCardProps) => {
  return (
    <IdeaCardWrapper>
      <img src={image ?? IdeaBack} />
      <CardBoxBack />
      <CardBox>
        <div>{category}</div>
        <div>{title}</div>
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
  background-color: blue;
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
  color: ${(props) => props.theme.colors.w1};
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 16px;
  gap: 6px;
  word-wrap: break-word;
`;
