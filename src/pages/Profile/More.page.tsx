import styled from '@emotion/styled';
import { BottomSheet, Divider, Header, Spacer, Text, theme } from 'concept-be-design-system';
import { useState } from 'react';

import SEOMeta from '../../components/SEOMeta/SEOMeta';
import Privacy from '../../components/Terms/Privacy';
import UsageTerms from '../../components/Terms/UsageTerms';
import Back from '../../layouts/Back';

const More = () => {
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
      <SEOMeta title="컨셉비 | 더보기" description="아이디어 기반의 안전하고 자유로운 팀원 찾기 플랫폼" />

      <Container>
        <Header spacerPosition="end">
          <Header.Item>
            <Back />
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
          <Text style={{ lineHeight: '22px' }} font="suit14r" color="b6">
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
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isOpen &&
          (moreState === '개인정보' ? (
            <Privacy onClose={() => setIsOpen(false)} />
          ) : (
            <UsageTerms onClose={() => setIsOpen(false)} />
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
  background-color: ${theme.color.bg1};
`;

const MainWrapper = styled.section`
  /* background-color: ${theme.color.bg1}; */
  /* height: 100svh; */
  padding: 84px 30px 0 30px;
  overflow: hidden;
`;

const MoreButton = styled.button`
  width: 100%;
  text-align: left;
  cursor: pointer;
`;
