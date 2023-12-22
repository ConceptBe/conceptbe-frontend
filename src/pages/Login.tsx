import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { AuthKakao } from '../api/api';
import { ReactComponent as Kakao } from '../assets/svg/login/kakao.svg';
import { ReactComponent as Naver } from '../assets/svg/login/naver.svg';
import { ReactComponent as Logo } from '../assets/svg/login_main.svg';
import Spacer from '../components/Spacer';
import Text from '../components/Text';
import UnStyleButton from '../components/UnStyleButton';

const Login = () => {
  const theme = useTheme();

  const REST_API_KEY = 'da0c8695d73803f2fbd834906a0d96d0';
  // const REDIRECT_URI = 'http://localhost:3020/auth';
  const REDIRECT_URI = 'http://15.164.242.20/api/auth/idpresponse/kakao';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const onClickKakao = () => {
    window.location.href = link;
  };

  // useEffect(() => {
  //   AuthKakao()
  //     .then((res) => {
  //       console.log('res', res);
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  // }, []);

  return (
    <Container>
      <Logo />
      <Spacer top={40} />
      <UnStyleButton onClick={onClickKakao}>
        <ButtonWrapper>
          <LogoBox color="#FAE100">
            <Kakao />
          </LogoBox>
          <TextWrapper>
            <Text font={theme.typography.suit15rb}>카카오 로그인</Text>
          </TextWrapper>
        </ButtonWrapper>
      </UnStyleButton>

      <Spacer top={10} />
      <UnStyleButton>
        <ButtonWrapper>
          <LogoBox color="#03C75A">
            <Naver />
          </LogoBox>
          <TextWrapper>
            <Text font={theme.typography.suit15rb}>네이버 로그인</Text>
          </TextWrapper>
        </ButtonWrapper>
      </UnStyleButton>
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
  /* border: 1px solid ${({ theme }) => theme.colors.l1}; */
  border-radius: 8px;
`;

const LogoBox = styled.div<{ color: string }>`
  padding: 6px;
  background-color: ${(props) => props.color};
  border-radius: 8px 0px 0px 8px;
`;

const TextWrapper = styled.div`
  padding: 15px 66px;
  border-top: 1px solid ${({ theme }) => theme.colors.l1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.l1};
  border-right: 1px solid ${({ theme }) => theme.colors.l1};
  border-radius: 0 8px 8px 0;
`;
