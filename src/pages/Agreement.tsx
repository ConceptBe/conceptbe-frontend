import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import AgreementImg from '../assets/images/agreement_bg.png';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Text from '../components/Text';

const Agreement = () => {
  const theme = useTheme();

  const [isOpenCollection, setIsOpenCollection] = useState(false);
  const [isOpenTerms, setIsOpenTerms] = useState(false);

  const onClickCollection = () => {
    console.log('onClickCollection');
    setIsOpenCollection(true);
    setIsOpenTerms(false);
  };
  const onClickTerms = () => {
    console.log('onClickTer');
    setIsOpenTerms(true);
    setIsOpenCollection(false);
  };

  const collectionBottomSheet = () => {
    const CollectionWrapper = styled.div`
      display: flex;
      position: relative;
      flex-direction: column;
      padding: 22px;
      padding-bottom: 72px;
    `;

    const UnorderedList = styled.ul`
      width: 100%;
      line-height: 22px;
    `;

    const ListItem = styled.li`
      list-style: disc;
      color: ${(props) => props.theme.colors.b6};
      list-style-position: inside;
      font-size: 14px;
      font-weight: 400;
      padding-left: 20px;
      text-indent: -20px;
      margin: 0;
    `;

    const BtnDiv = styled.div`
      position: fixed;
      width: 330px;
      margin-right: 22px;
      bottom: 24px;
    `;

    return (
      <BottomSheet
        scroll
        isOpen={isOpenCollection}
        onClose={() => {
          setIsOpenCollection(false);
        }}
      >
        <CollectionWrapper style={{ display: isOpenCollection ? '' : 'none' }}>
          <Text font={theme.typography.suit18sb} color={theme.colors.b2}>
            서비스 이용약관
          </Text>
          <Spacer bottom={16} />
          <Text font={theme.typography.suit14r} color={theme.colors.b6} style={{ lineHeight: '22px' }}>
            본 이용약관은 컨셉BE (이하 "서비스")를 이용하는 사용자에게 적용됩니다. 서비스를 이용함으로써 사용자는 본
            약관에 동의하는 것으로 간주됩니다.
          </Text>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            1. 서비스 이용
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>사용자는 본 서비스를 무료로 이용할 수 있습니다.</ListItem>
            <ListItem>서비스 이용 시 사용자는 관련 법령 및 이 약관을 준수하여야 합니다.</ListItem>
            <ListItem>사용자는 타인의 정보를 도용하거나 부정한 방법으로 서비스를 이용해서는 안 됩니다.</ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            2. 서비스 제공 및 변경
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>서비스는 사용자에게 계속적으로 제공되는 것을 보장하지않습니다. </ListItem>
            <ListItem>서비스 내용은 회사의 판단에 따라 변경될 수 있습니다.</ListItem>
            <ListItem>서비스의 변경 또는 중단으로 인한 손해에 대해 회사는 책임지지 않습니다.</ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            3. 정보 보안
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>사용자는 자신의 계정 정보를 안전하게 관리해야 합니다.</ListItem>
            <ListItem>계정 정보 유출로 인한 문제에 대한 책임은 사용자에게 있습니다.</ListItem>
            <ListItem>
              사용자는 서비스 이용 중에 보안에 관련된 취약점을 발견한 경우, 즉시 회사에 보고해야 합니다.
            </ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            4. 콘텐츠 이용
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>
              서비스 내의 콘텐츠(텍스트, 이미지, 동영상 등)는 컨셉BE 또는 해당 콘텐츠의 제공자의 소유물입니다.
            </ListItem>
            <ListItem>사용자는 서비스 내의 콘텐츠를 복제, 수정, 배포하는 등의 행위를 하지 않아야 합니다.</ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            5. 개인정보 처리
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>개인정보 처리에 관한 사항은 별도의 개인정보처리방침을 따릅니다. </ListItem>
            <ListItem>사용자의 개인정보는 관련 법령과 본 서비스의 개인정보처리방침에 따라 처리됩니다.</ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            6. 면책조항
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>서비스 사용으로 발생한 어떠한 손해에 대해서도 본 서비스는 책임지지 않습니다.</ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.c1}>
            7. 타인의 아이디어 조회 관련 동의사항
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem
              style={{
                color: '#5F27FF',
              }}
            >
              게시글을 조회하면 내가 아이디어를 확인하였다는 사실이 자동으로 데이터베이스에 저장됩니다. (데이터베이스
              저장 내용 : 이용자의 식별 정보 - 이름, 이메일 주소, 사용자 고유 키값, 게시글 조회일자, 기타 소셜 로그인
              통해 받아온 사용자 정보)
            </ListItem>
            <ListItem
              style={{
                color: '#5F27FF',
              }}
            >
              아이디어 표절이나 도용 시 해당 사실을 근거로 불이익이 발생할 수 있습니다
            </ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b6}>
            본 이용약관의 내용은 23.08.24에 업데이트되었습니다.
          </Text>
          <BtnDiv>
            <Button
              text="확인"
              isActive
              style={{
                width: '100%',
              }}
              onClick={() => setIsOpenCollection(false)}
            />
          </BtnDiv>
        </CollectionWrapper>
      </BottomSheet>
    );
  };

  const termsBottomSheet = () => {
    const CollectionWrapper = styled.div`
      display: flex;
      flex-direction: column;
      padding: 22px;
      padding-bottom: 72px;
    `;

    const UnorderedList = styled.ul`
      width: 100%;
      line-height: 22px;
    `;

    const ListItem = styled.li`
      list-style: disc;
      color: ${(props) => props.theme.colors.b6};
      list-style-position: inside;
      font-size: 14px;
      font-weight: 400;
      padding-left: 20px;
      text-indent: -20px;
      margin: 0;
    `;

    const OrderedList = styled.ol`
      color: ${(props) => props.theme.colors.b6};
      font-size: 14px;
      font-weight: 400;
    `;

    const BtnDiv = styled.div`
      position: fixed;
      width: 330px;
      margin-right: 22px;
      bottom: 24px;
    `;

    return (
      <BottomSheet
        scroll
        isOpen={isOpenTerms}
        onClose={() => {
          setIsOpenTerms(false);
        }}
      >
        <CollectionWrapper style={{ display: isOpenTerms ? '' : 'none' }}>
          <Text font={theme.typography.suit18sb} color={theme.colors.b2}>
            개인정보 수집 및 이용 동의
          </Text>
          <Spacer bottom={16} />
          <Text font={theme.typography.suit14r} color={theme.colors.b6} style={{ lineHeight: '22px' }}>
            본 개인정보처리방침은 컨셉BE에서 제공하는 서비스 이용과 관련하여 사용자의 개인정보 보호에 대한 내용을
            설명합니다. 서비스를 이용함으로써 사용자는 본 방침에 동의하는 것으로 간주됩니다.
          </Text>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            1. 수집하는 개인정보의 종류 및 목적
          </Text>
          <Spacer bottom={10} />

          <UnorderedList>
            <OrderedList>서비스는 다음과 같은 개인정보를 수집할 수 있습니다:</OrderedList>
            <ListItem>이용자의 식별 정보 (이름, 이메일 주소 등)</ListItem>
            <ListItem>서비스 이용 기록 (접속 로그, 활동 내역 등)</ListItem>
            <OrderedList>수집된 개인정보는 다음과 같은 목적으로 사용될 수 있습니다:</OrderedList>
            <ListItem>서비스 제공 및 관리</ListItem>
            <ListItem> 사용자에게 서비스 관련 정보 제공 </ListItem>
            <ListItem> 서비스 개선 및 사용자 경험 향상 </ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            2. 개인정보의 보유 및 이용 기간
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>
              개인정보는 사용자가 서비스를 이용하는 동안에 한하여 보유되며, 서비스 이용 종료 시에는 관련 법령과 내부
              방침에 따라 즉시 파기됩니다.{' '}
            </ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            3. 개인정보의 제3자 제공
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>서비스는 사용자의 개인정보를 제3자에게 제공하지 않습니다.</ListItem>
            <ListItem>
              다만, 법률적인 의무를 준수하거나 사용자의 동의가 있는 경우에는 예외적으로 제공될 수 있습니다.
            </ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            4. 개인정보의 보안 조치
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>서비스는 개인정보를 보호하기 위해 적절한 보안 조치를 취합니다.</ListItem>
            <ListItem>개인정보의 무단 접근, 유출, 변조, 손상 등을 방지하기 위한 노력을 기울이고 있습니다.</ListItem>
          </UnorderedList>
          <Spacer bottom={20} />
          <Text font={theme.typography.suit14sm} color={theme.colors.b2}>
            5. 개인정보에 대한 사용자의 권리
          </Text>
          <Spacer bottom={10} />
          <UnorderedList>
            <ListItem>사용자는 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다.</ListItem>
            <ListItem>또한 개인정보 처리에 대한 동의 철회도 가능합니다. </ListItem>
            <ListItem>이에 관한 요청은 [연락처 정보]로 문의하시기 바랍니다. </ListItem>
            <ListItem>
              본 개인정보처리방침의 내용은 변경될 수 있으며, 변경 시에는 서비스를 통해 사전 공지할 것입니다.
            </ListItem>
          </UnorderedList>
          <Spacer bottom={20} />

          <Text font={theme.typography.suit14sm} color={theme.colors.b6}>
            본 이용약관의 내용은 23.08.24에 업데이트되었습니다.
          </Text>
          <BtnDiv>
            <Button
              text="확인"
              isActive
              style={{
                width: '100%',
              }}
              onClick={() => setIsOpenTerms(false)}
            />
          </BtnDiv>
        </CollectionWrapper>
      </BottomSheet>
    );
  };

  return (
    <AgreementWrapper>
      <img src={AgreementImg} />
      <Spacer bottom={50} />

      <Text
        font={theme.typography.suit22sb}
        color={theme.colors.b2}
        style={{
          lineHeight: 'normal',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        컨셉BE는 <br />
        <div style={{ display: 'flex' }}>
          <p style={{ color: '#5F27FF' }}>아이디어의 독창성</p>을
        </div>
        보호하는 플랫폼입니다.
      </Text>
      <Spacer bottom={20} />
      <Text
        font={theme.typography.suit14r}
        color={theme.colors.b6}
        style={{
          lineHeight: '22px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        게시글을 조회하면 아이디어를 확인하였다는 <br /> 사실이 자동으로 데이터베이스에 저장됩니다. <br />
        아이디어 표절이나 도용 시 해당 사실을 근거로 <br />
        불이익이 발생할 수 있습니다.
      </Text>
      <Spacer bottom={50} />
      <Text
        font={theme.typography.suit13m}
        color={theme.colors.b4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: '150%',

          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          <p
            onClick={onClickTerms}
            style={{ cursor: 'pointer', color: '#5F27FF', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            개인정보 수집 및 이용 동의
          </p>
          &nbsp; 및
        </div>
        <div style={{ display: 'flex' }}>
          <p
            onClick={onClickCollection}
            style={{ cursor: 'pointer', color: '#5F27FF', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            서비스 이용약관
          </p>
          에 동의하시나요?
        </div>
      </Text>
      <Spacer bottom={24} />
      <Button onClick={() => {}} isActive={true} text="동의하고 시작하기" />

      {collectionBottomSheet()}
      {termsBottomSheet()}
    </AgreementWrapper>
  );
};

export default Agreement;

const AgreementWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 22px;
`;
