import styled from '@emotion/styled';
import { Button, Flex, PNGErrorBackground, Spacer, Text, theme } from 'concept-be-design-system';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  children: ReactNode;
  onClickRetry?: () => void;
  isGlobal?: boolean;
}

const ErrorFallback = ({ title, children, isGlobal, onClickRetry }: Props) => {
  const navigate = useNavigate();

  const goToPrevPage = () => {
    if (onClickRetry) onClickRetry();
    navigate(-1);
  };

  const goToHome = () => {
    if (onClickRetry) onClickRetry();
    navigate('/');
  };

  return (
    <Flex
      {...(isGlobal && {
        maxWidth: 375,
        margin: '0 auto',
        shadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      })}
      height="100%"
      direction="column"
      padding="20px 22px"
      boxSizing="border-box"
    >
      {isGlobal ? <></> : <Spacer size={40} />}
      <img src={PNGErrorBackground} />
      <Spacer size={26} />
      <Flex direction="column" alignItems="center" justifyContent="center">
        <TitleWrapper>{title}</TitleWrapper>
        <Spacer size={20} />
        <ContentWrapper>{children}</ContentWrapper>
      </Flex>
      <Spacer size={20} />
      <Flex gap={10}>
        <Button isGrayOut onClick={goToPrevPage}>
          이전 페이지
        </Button>
        <Button onClick={goToHome}>메인으로 가기</Button>
      </Flex>
    </Flex>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  font-size: ${theme.font.suit22sb.fontSize}px;
  font-weight: ${theme.font.suit22sb.fontWeight};
  color: ${theme.color.b2};
`;

const ContentWrapper = styled.div`
  font-size: ${theme.font.suit14r.fontSize}px;
  font-weight: ${theme.font.suit14r.fontWeight};
  color: ${theme.color.b6};
  text-align: center;
  line-height: 22px;
`;

export default ErrorFallback;
