import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactComponent as Comment } from '../../assets/svg/comment_14.svg';
import { ReactComponent as Profile } from '../../assets/svg/default_profile.svg';
import { ReactComponent as Like } from '../../assets/svg/like_14.svg';
import { ReactComponent as UnScrap } from '../../assets/svg/scrap.svg';
import { ReactComponent as ScrapView } from '../../assets/svg/scrap_14.svg';
// footer
import { ReactComponent as View } from '../../assets/svg/view_14.svg';
import Tag, { TagProps } from '../Tag.tsx';

import Text from '../Text.tsx';
import Spacer from '../Spacer.tsx';

const IdeaCard = ({ tags }: TagProps) => {
  const theme = useTheme();
  return (
    <CardContainer>
      <ProfileWrapper>
        <ProfileBox>
          <Profile />
          <div>
            <Text font={theme.typography.suit14m}>일이삼사오육칠팔구</Text>
            <Spacer top={4} />
            <Text font={theme.typography.suit12m} color={theme.colors.b9}>
              스킬 | 작성시간
            </Text>
          </div>
        </ProfileBox>
        <UnScrap />
      </ProfileWrapper>

      <ContentWrapper>
        <Text font={theme.typography.suit14m} color={theme.colors.c1}>
          분야 / 분야 / 분야
        </Text>
        <Text font={theme.typography.suit16sb}>20자 내외의 제목이 들어가는 영역입니다.</Text>
        <ContentText>
          3줄의 아이디어 내용이 들어가는 영역입니다. 3줄 이상부터는 말줄임표로 노출합니다. 3줄의 아이디어 내용이
          들어가는 영역입니다. 3줄 이상부터는 말줄임표로 노출합니다.
        </ContentText>
        <TagWrapper>
          <Tag tags={tags} />
        </TagWrapper>
      </ContentWrapper>

      <FooterWrapper>
        <FooterText>
          <View />
          999+
        </FooterText>
        <FooterText>
          <Comment />
          999+
        </FooterText>
        <FooterText>
          <Like />
          999+
        </FooterText>
        <FooterText>
          <ScrapView />
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
  gap: 8px;
  margin: 20px 0 0;
`;

const ContentText = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.b6};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const TagWrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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
  color: ${(props) => props.theme.colors.b9};
  margin-right: 10px;
`;
