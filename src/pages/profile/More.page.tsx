import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Back } from '../../assets/svg/back_24_B.svg';
import Divider from '../../components/@common/Divider/Divider';
import Spacer from '../../components/@common/Spacer';
import Text from '../../components/@common/Text/Text';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import Privacy from '../../components/BottomSheet/use/Privacy';
import Terms from '../../components/BottomSheet/use/Terms';
import { Header } from '../../components/Header/Header';
import UnStyleButton from '../../components/UnStyleButton';

const More = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [moreState, setMoreState] = useState('');

  const onMoreClick = (string: string) => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setMoreState(string);
    }
  };

  return (
    <>
      <Container>
        <Header emptyEnd>
          <Header.Item>
            <UnStyleButton style={{ color: theme.color.b4 }} onClick={() => navigate(-1)}>
              <Back />
            </UnStyleButton>
          </Header.Item>
          <Header.Item>
            <Text font="suit16sb" color="b4">
              더보기
            </Text>
          </Header.Item>
        </Header>

        <MainWrapper>
          <MoreButton>
            <Text font="suit15m" color="b4">
              로그인/회원가입
            </Text>
          </MoreButton>
          <Divider color="l3" top={22} bottom={22} />

          <MoreButton onClick={() => onMoreClick('이용약관')}>
            <Text font="suit15m" color="b4">
              이용약관
            </Text>
          </MoreButton>
          <Divider color="l3" top={22} bottom={22} />

          <MoreButton onClick={() => onMoreClick('개인정보')}>
            <Text font="suit15m" color="b4">
              개인정보처리방침
            </Text>
          </MoreButton>
          <Divider color="l3" top={22} bottom={22} />

          <Text font="suit15m" color="b4">
            기타 문의 사항
          </Text>

          <Spacer size={8} />
          <Text customStyle={{ lineHeight: '22px' }} font="suit14r" color="b6">
            기타 문의사항이 있으실 경우, ABCDEFG123456@gmail.com으로 연락주세요
          </Text>

          <Divider color="l3" top={22} bottom={22} />
          <MoreButton>
            <Text font="suit15rb" color="ba">
              회원탈퇴
            </Text>
          </MoreButton>
        </MainWrapper>
      </Container>
      <BottomSheet scroll isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isOpen &&
          (moreState === '개인정보' ? (
            <Privacy isOpen={isOpen} onClose={() => setIsOpen(false)} />
          ) : (
            <Terms isOpen={isOpen} onClose={() => setIsOpen(false)} />
          ))}
      </BottomSheet>
    </>
  );
};

export default More;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* height: calc(var(--vh, 1vh) * 100); */
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.bg1};
`;

const MainWrapper = styled.section`
  /* background-color: ${({ theme }) => theme.color.bg1}; */
  /* height: 100svh; */
  padding: 84px 30px 0 30px;
  overflow: hidden;
`;

const MoreButton = styled(UnStyleButton)`
  width: 100%;
  text-align: left;
`;
