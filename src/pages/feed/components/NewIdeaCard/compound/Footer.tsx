import styled from '@emotion/styled';
import {
  Divider,
  SVGCardComment14,
  SVGCardLike14,
  SVGCardScrap14,
  SVGCardView14,
  theme,
} from 'concept-be-design-system';

import { useFooterContext } from '../NewIdeaCardContext';

const Footer = () => {
  const { hitsCount, commentsCount, likesCount, bookmarksCount } = useFooterContext();

  const getCount = (count: number) => {
    if (count > 999) {
      return '999+';
    }
    return count;
  };

  return (
    <>
      <Divider top={18} bottom={16} color="l3" />
      <FooterWrapper>
        <FooterText>
          <SVGCardView14 />
          {getCount(hitsCount)}
        </FooterText>
        <FooterText>
          <SVGCardComment14 />
          {getCount(commentsCount)}
        </FooterText>
        <FooterText>
          <SVGCardLike14 />
          {getCount(likesCount)}
        </FooterText>
        <FooterText>
          <SVGCardScrap14 />
          {getCount(bookmarksCount)}
        </FooterText>
      </FooterWrapper>
    </>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

const FooterText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${theme.color.b9};
  margin-right: 10px;
`;
