import styled from '@emotion/styled';

import IdeaBack from '../../assets/images/idea_back.png';
import IdeaBack2 from '../../assets/images/idea_back2.png';
import IdeaBack3 from '../../assets/images/idea_back3.png';
import IdeaBack4 from '../../assets/images/idea_back4.png';
import IdeaBack5 from '../../assets/images/idea_back5.png';
import Text from '../@common/Text/Text';

interface IdeaCardProps {
  category: string;
  title: string;
  image?: string;
}

const randomImages = [IdeaBack, IdeaBack2, IdeaBack3, IdeaBack4, IdeaBack5];

const PopCard = ({ category, title, image }: IdeaCardProps) => {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  const test = randomImages[randomNumber];
  console.log('test', test);
  return (
    <IdeaCardWrapper>
      <img src={image ?? IdeaBack} />
      <CardBoxBack />
      <CardBox>
        <Text customStyle={{ fontSize: 13, fontWeight: 800 }} color="w1">
          {category}
        </Text>
        <Text customStyle={{ fontSize: 14, fontWeight: 600, lineHeight: '20px' }} color="w1">
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
  background-color: ${({ theme }) => theme.color.c1};
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
  color: ${(props) => props.theme.color.w1};
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 15px 15px 15px;
  gap: 6px;
  word-wrap: break-word;
`;
