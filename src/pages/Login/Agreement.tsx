import styled from '@emotion/styled';
import { BottomSheet, Button, Spacer, Text, PNGAgreementBackground, Flex, Box } from 'concept-be-design-system';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SEOMeta from '../../components/SEOMeta/SEOMeta';
import Privacy from '../../components/Terms/Privacy';
import UsageTerms from '../../components/Terms/UsageTerms';
import useConfirm from '../../hooks/useConfrim';
import { OauthMemberInfo } from '../../types/login';

const Agreement = () => {
  const { state: memberInfo }: { state: OauthMemberInfo | null } = useLocation();
  const openConfirm = useConfirm();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);

  const onClickOpenPrivacy = () => {
    setIsOpen(true);
    setIsOpenPrivacy(true);
  };

  const onClickOpenUsageTerms = () => {
    setIsOpen(true);
    setIsOpenPrivacy(false);
  };

  const onCloseBottomSheet = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (memberInfo) return;

    (async () => {
      if (await openConfirm({ content: '잘못된 접근 방식입니다. 로그인 이후 시도해 주세요.' })) {
        navigate('/login');
        return;
      }

      navigate('/');
    })();
  }, [memberInfo, navigate, openConfirm]);

  return (
    <>
      <SEOMeta title="컨셉비 | 약관동의" description="컨셉비 시작하기 (로그인/회원가입)" />

      <Wrapper height="100%" direction="column" padding="20px 22px">
        <Box maxWidth={375} maxHeight={375}>
          <AgreementImage src={PNGAgreementBackground} />
        </Box>
        <Spacer size={50} />

        <Text
          font="suit22sb"
          color="b2"
          style={{
            lineHeight: 'normal',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          컨셉BE는 <br />
          <Flex>
            <Text font="suit22sb" color="c1">
              아이디어의 독창성
            </Text>
            을
          </Flex>
          보호하는 플랫폼입니다.
        </Text>
        <Spacer size={20} />
        <Flex width={248} justifyContent="center" alignItems="center" margin="0 auto">
          <Text
            font="suit14r"
            color="b6"
            style={{
              lineHeight: '22px',
              textAlign: 'center',
            }}
          >
            게시글을 조회하면 아이디어를 확인하였다는 사실이 자동으로 데이터베이스에 저장됩니다. 아이디어 표절이나 도용
            시 해당 사실을 근거로 불이익이 발생할 수 있습니다.
          </Text>
        </Flex>

        <DynamicSpacer size={28} />

        <Text
          font="suit13m"
          color="b4"
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '150%',
            alignItems: 'center',
          }}
        >
          <Flex>
            <Text
              font="suit13m"
              color="c1"
              onClick={onClickOpenPrivacy}
              style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              개인정보 수집 및 이용 동의
            </Text>
            &nbsp; 및
          </Flex>
          <Flex>
            <Text
              font="suit13m"
              color="c1"
              onClick={onClickOpenUsageTerms}
              style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              서비스 이용약관
            </Text>
            에 동의하시나요?
          </Flex>
        </Text>
        <Spacer size={24} />
        <Button onClick={() => navigate('/sign-up', { state: memberInfo })}>동의하고 시작하기</Button>

        <BottomSheet isOpen={isOpen} onClose={onCloseBottomSheet}>
          {isOpenPrivacy && <Privacy onClose={onCloseBottomSheet} />}
          {!isOpenPrivacy && <UsageTerms onClose={onCloseBottomSheet} />}
        </BottomSheet>
      </Wrapper>
    </>
  );
};

export default Agreement;

const Wrapper = styled(Flex)`
  box-sizing: border-box;
`;

const AgreementImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DynamicSpacer = styled(Spacer)`
  height: 100%;
`;
