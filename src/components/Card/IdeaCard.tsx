import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as Comment } from '../../assets/svg/comment_14.svg';
import { ReactComponent as Profile } from '../../assets/svg/default_profile.svg';
import { ReactComponent as Dots } from '../../assets/svg/FeedDetail/dots_vertical.svg';
import { ReactComponent as Like } from '../../assets/svg/like_14.svg';
import { ReactComponent as UnScrap } from '../../assets/svg/scrap.svg';
import { ReactComponent as ScrapView } from '../../assets/svg/scrap_14.svg';
// footer
import { ReactComponent as View } from '../../assets/svg/view_14.svg';
import Text from '../@common/Text/Text.tsx';
import Divider from '../Divider.tsx';
import Spacer from '../Spacer.tsx';
import Tag, { TagProps } from '../Tag.tsx';

interface IdeaCardProps {
  mine?: boolean;
  tags: TagProps;
}

const IdeaCard = ({ mine, tags }: TagProps) => {
  const theme = useTheme();
  return (
    <CardContainer>
      <ProfileWrapper>
        <ProfileBox>
          <Profile />
          <div>
            <Text font="suit14m" color="b4">
              일이삼사오육칠팔구
            </Text>
            <Spacer top={7} />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text font="suit12r" color="b9">
                스킬
              </Text>
              <Spacer left={6} />
              <div style={{ width: 1, height: 10, backgroundColor: theme.color.l2 }} />
              <Spacer left={6} />
              <Text font="suit12r" color="b9">
                작성시간
              </Text>
            </div>
          </div>
        </ProfileBox>
        {mine ? <Dots color="ba" /> : <UnScrap />}
      </ProfileWrapper>

      <ContentWrapper>
        <Text font="suit14m" color="c1">
          분야 / 분야 / 분야
        </Text>
        <Spacer top={7} />

        <Text font="suit16sb">20자 내외의 제목이 들어가는 영역입니다.</Text>
        <Spacer top={10} />

        <ContentText>
          3줄의 아이디어 내용이 들어가는 영역입니다. 3줄 이상부터는 말줄임표로 노출합니다. 3줄의 아이디어 내용이
          들어가는 영역입니다. 3줄 이상부터는 말줄임표로 노출합니다.
        </ContentText>
        <Spacer top={14} />

        <TagWrapper>
          <Tag tags={tags} />
        </TagWrapper>
      </ContentWrapper>

      <Divider top={18} bottom={16} color="l3" />
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
  background-color: ${({ theme }) => theme.color.w1};
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
  color: ${(props) => props.theme.color.b6};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const TagWrapper = styled.div`
  /* padding-top: 6px;
  padding-bottom: 18px; */
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
  color: ${(props) => props.theme.color.b9};
  margin-right: 10px;
`;
