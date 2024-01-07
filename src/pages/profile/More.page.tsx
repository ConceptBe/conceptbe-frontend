import styled from '@emotion/styled';
import { BottomSheet, Divider, Header, Spacer, Text, theme, SVGBack24B } from 'concept-be-design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Privacy from './Terms/Privacy';
import UsageTerms from './Terms/UsageTerms';

const More = () => {
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
        <Header spacerPosition="end">
          <Header.Item>
            <SVGBackWrapper>
              <SVGBack24B onClick={() => navigate(-1)} />
            </SVGBackWrapper>
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

const SVGBackWrapper = styled.button`
  color: ${theme.color.b4};
  cursor: pointer;
`;
