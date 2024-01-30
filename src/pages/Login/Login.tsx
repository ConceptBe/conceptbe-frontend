import styled from '@emotion/styled';
import { Spacer, Text, theme, SVGLoginKakao, SVGLoginNaver, SVGLoginLogo, Flex } from 'concept-be-design-system';

const REQUEST_URL = `http://localhost:8080/oauth/kakao`;

const Login = () => {
  const onClickOauthKakao = () => {
    window.location.href = REQUEST_URL;
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
      <SVGLoginLogo />
      <Spacer size={40} />
      <ButtonWrapper onClick={onClickOauthKakao}>
        <LogoBox color="#FAE100">
          <SVGLoginKakao />
        </LogoBox>
        <TextWrapper>
          <Text font="suit15rb">카카오 로그인</Text>
        </TextWrapper>
      </ButtonWrapper>

      <Spacer size={10} />

      <ButtonWrapper>
        <LogoBox color="#03C75A">
          <SVGLoginNaver />
        </LogoBox>
        <TextWrapper>
          <Text font="suit15rb">네이버 로그인</Text>
        </TextWrapper>
      </ButtonWrapper>
    </Flex>
  );
};

export default Login;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  width: 250px;
  height: 51px;
`;

const LogoBox = styled.div<{ color: string }>`
  aspect-ratio: 1;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 8px 0px 0px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${theme.color.l1};
  border-bottom: 1px solid ${theme.color.l1};
  border-right: 1px solid ${theme.color.l1};
  border-radius: 0 8px 8px 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;
