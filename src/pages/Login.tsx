import styled from '@emotion/styled';

import { ReactComponent as SVGKakao } from '../assets/svg/login/kakao.svg';
import { ReactComponent as SVGNaver } from '../assets/svg/login/naver.svg';
import { ReactComponent as SVGLogo } from '../assets/svg/login_main.svg';
import Spacer from '../components/@common/Spacer/Spacer';
import Text from '../components/@common/Text/Text';

const REQUEST_URL = `http://localhost:8080/oauth/kakao`;

const Login = () => {
  const onClickOauthKakao = () => {
    window.location.href = REQUEST_URL;
  };

  return (
    <Container>
      <SVGLogo />
      <Spacer size={40} />
      <ButtonWrapper onClick={onClickOauthKakao}>
        <LogoBox color="#FAE100">
          <SVGKakao />
        </LogoBox>
        <TextWrapper>
          <Text font="suit15rb">카카오 로그인</Text>
        </TextWrapper>
      </ButtonWrapper>

      <Spacer size={10} />
      <ButtonWrapper>
        <LogoBox color="#03C75A">
          <SVGNaver />
        </LogoBox>
        <TextWrapper>
          <Text font="suit15rb">네이버 로그인</Text>
        </TextWrapper>
      </ButtonWrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
`;

const LogoBox = styled.div<{ color: string }>`
  padding: 6px;
  background-color: ${(props) => props.color};
  border-radius: 8px 0px 0px 8px;
`;

const TextWrapper = styled.div`
  padding: 15px 66px;
  border-top: 1px solid ${({ theme }) => theme.color.l1};
  border-bottom: 1px solid ${({ theme }) => theme.color.l1};
  border-right: 1px solid ${({ theme }) => theme.color.l1};
  border-radius: 0 8px 8px 0;
`;
