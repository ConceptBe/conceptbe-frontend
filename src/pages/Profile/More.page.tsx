import styled from '@emotion/styled';
import { BottomSheet, Divider, Header, Text, theme } from 'concept-be-design-system';
import { useState } from 'react';

import useDeleteAccount from './hooks/mutations/useDeleteAccount';
import SEOMeta from '../../components/SEOMeta/SEOMeta';
import Privacy from '../../components/Terms/Privacy';
import UsageTerms from '../../components/Terms/UsageTerms';
import useConfirm from '../../hooks/useConfirm';
import Back from '../../layouts/Back';
import useNavigatePage from '../hooks/useNavigatePage';

const More = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreState, setMoreState] = useState('');
  const isLoggedIn = Boolean(localStorage.getItem('user')) && Boolean(localStorage.getItem('userToken'));
  const { goFeedPage, goLoginPage } = useNavigatePage();
  const { deleteAccount } = useDeleteAccount();
  const openConfirm = useConfirm();

  const onMoreClick = (string: string) => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setMoreState(string);
    }
  };

  const logout = async () => {
    const isLogout = await openConfirm({ content: '정말 로그아웃하시겠습니까?' });
    if (!isLogout) return;

    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    goFeedPage();
  };

  const handleDeleteAccount = async () => {
    const isDelete = await openConfirm({ content: '정말 탈퇴하시겠습니까? 회원 정보가 즉시 삭제됩니다.' });
    if (!isDelete) return;

    deleteAccount();
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
              더 보기
            </Text>
          </Header.Item>
        </Header>

        <MainWrapper>
          {isLoggedIn ? (
            <MoreButton onClick={logout}>
              <Text font="suit15m" color="b4">
                로그아웃
              </Text>
            </MoreButton>
          ) : (
            <MoreButton onClick={goLoginPage}>
              <Text font="suit15m" color="b4">
                로그인/회원가입
              </Text>
            </MoreButton>
          )}
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
          <Text
            as="a"
            font="suit15m"
            color="b4"
            href="mailto:conceper.biz@gmail.com"
            style={{ textDecoration: 'none' }}
          >
            기타 문의 사항
          </Text>
          <Divider color="l3" top={22} bottom={22} />
          <MoreButton onClick={handleDeleteAccount}>
            <Text font="suit15m" color="ba">
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
  height: 100dvh;
  overflow: hidden;
  background-color: ${theme.color.bg1};
`;

const MainWrapper = styled.section`
  padding: 84px 30px 0 30px;
  overflow: hidden;
`;

const MoreButton = styled.button`
  width: 100%;
  text-align: left;
  cursor: pointer;
`;
