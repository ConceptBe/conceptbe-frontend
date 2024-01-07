import styled from '@emotion/styled';
import {
  Badge,
  Divider,
  Spacer,
  Text,
  theme,
  SVGComment14,
  SVGDefaultProfile,
  SVGFeedDotsVertical,
  SVGLike14,
  SVGScrap,
  SVGScrap14,
  SVGView14,
} from 'concept-be-design-system';
import { useNavigate } from 'react-router-dom';

interface Props {
  mine?: boolean;
  badges: string[];
}

const IdeaCard = ({ mine, badges }: Props) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate('/feed/1')}>
      <ProfileWrapper>
        <ProfileBox>
          <SVGDefaultProfile />
          <div>
            <Text font="suit14m" color="b4">
              일이삼사오육칠팔구
            </Text>
            <Spacer size={7} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text font="suit12r" color="b9">
                스킬
              </Text>
              <Spacer size={6} />
              <div style={{ width: 1, height: 10, backgroundColor: theme.color.l2 }} />
              <Spacer size={6} />
              <Text font="suit12r" color="b9">
                작성시간
              </Text>
            </div>
          </div>
        </ProfileBox>
        {mine ? <SVGFeedDotsVertical color="ba" /> : <SVGScrap />}
      </ProfileWrapper>

      <ContentWrapper>
        <Text font="suit14m" color="c1">
          분야 / 분야 / 분야
        </Text>
        <Spacer size={7} />

        <Text font="suit16sb">20자 내외의 제목이 들어가는 영역입니다.</Text>
        <Spacer size={10} />

        <ContentText>
          3줄의 아이디어 내용이 들어가는 영역입니다. 3줄 이상부터는 말줄임표로 노출합니다. 3줄의 아이디어 내용이
          들어가는 영역입니다. 3줄 이상부터는 말줄임표로 노출합니다.
        </ContentText>
        <Spacer size={14} />

        <TagWrapper>
          <Badge>
            {badges.map((badge) => (
              <Badge.Item key={badge}>{badge}</Badge.Item>
            ))}
          </Badge>
        </TagWrapper>
      </ContentWrapper>

      <Divider top={18} bottom={16} color="l3" />
      <FooterWrapper>
        <FooterText>
          <SVGView14 />
          999+
        </FooterText>
        <FooterText>
          <SVGComment14 />
          999+
        </FooterText>
        <FooterText>
          <SVGLike14 />
          999+
        </FooterText>
        <FooterText>
          <SVGScrap14 />
          999+
        </FooterText>
      </FooterWrapper>
    </CardContainer>
  );
};

export default IdeaCard;

const CardContainer = styled.div`
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.08);
  background-color: ${theme.color.w1};
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 22px 0 0;
`;

const ContentText = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${theme.color.b6};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const TagWrapper = styled.div`
  padding: 0;
`;

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

//const FooterBox = styled.div``;

const FooterText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${theme.color.b9};
  margin-right: 10px;
`;
