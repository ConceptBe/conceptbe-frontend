import styled from '@emotion/styled';
import { Box, Button, Flex, ImageView, PNGErrorBackground, Spacer, theme } from 'concept-be-design-system';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  children: ReactNode;
  resetErrorBoundary: () => void;
  isInApiErrorBoundary?: boolean;
}

const ErrorFallback = ({ title, children, isInApiErrorBoundary, resetErrorBoundary }: Props) => {
  const navigate = useNavigate();

  const goToPrevPage = () => {
    resetErrorBoundary();
    navigate(-1);
  };

  const goToMainPate = async () => {
    // navigate('/')시 에만 동작하지 않습니다. await로 setState 배치 업데이트를 강제하여 실행하도록 했습니다.
    await resetErrorBoundary();
    navigate('/');
  };

  const onClickRetry = () => {
    resetErrorBoundary();
  };

  return (
    <Flex
      maxWidth={420}
      height="100dvh"
      margin="0 auto"
      shadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      direction="column"
      boxSizing="border-box"
    >
      <Box maxWidth={420} maxHeight={420}>
        <ImageView src={PNGErrorBackground} alt="에러 페이지 이미지" />
      </Box>
      <Box padding="0 22px">
        <Spacer size={26} />
        <Flex direction="column" alignItems="center" justifyContent="center">
          <TitleWrapper>{title}</TitleWrapper>
          <Spacer size={20} />
          <ContentWrapper>{children}</ContentWrapper>
        </Flex>
        <Spacer size={20} />
        {isInApiErrorBoundary ? (
          <Box width={160} margin="0 auto" onClick={onClickRetry}>
            <Button>다시 시도하기</Button>
          </Box>
        ) : (
          <Flex gap={10}>
            <Button isGrayOut onClick={goToPrevPage}>
              이전 페이지
            </Button>
            <Button onClick={goToMainPate}>메인으로 가기</Button>
          </Flex>
        )}
      </Box>
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
