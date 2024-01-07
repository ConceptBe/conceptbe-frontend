import styled from '@emotion/styled';
import { Button, Spacer, Text, theme } from 'concept-be-design-system';

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const Terms = ({ isOpen, onClose }: props) => {
  const CollectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 22px 22px 75px 22px;
  `;

  const UnorderedList = styled.ul`
    width: 100%;
    line-height: 22px;
  `;

  const ListItem = styled.li`
    list-style: disc;
    color: ${theme.color.b6};
    list-style-position: inside;
    font-size: 14px;
    font-weight: 400;
    padding-left: 20px;
    text-indent: -20px;
    margin: 0;
  `;

  const ButtonWrapper = styled.div`
    position: fixed;
    box-sizing: border-box;
    width: auto; /* changed this to auto */
    bottom: 0;
    left: 50%; /* centering the wrapper */
    transform: translateX(-50%); /* ensuring it's centered */
    display: flex;
    padding: 0 22px 20px 22px;
    max-width: 375px;
    width: 100%;
    background-color: #fff;
  `;

  return (
    <CollectionWrapper>
      <Text font="suit18sb" color="b2">
        서비스 이용약관
      </Text>
      <Spacer size={16} />
      <Text font="suit14r" color="b6" customStyle={{ lineHeight: '22px' }}>
        본 이용약관은 컨셉BE (이하 "서비스")를 이용하는 사용자에게 적용됩니다. 서비스를 이용함으로써 사용자는 본 약관에
        동의하는 것으로 간주됩니다.
      </Text>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        1. 서비스 이용
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>사용자는 본 서비스를 무료로 이용할 수 있습니다.</ListItem>
        <ListItem>서비스 이용 시 사용자는 관련 법령 및 이 약관을 준수하여야 합니다.</ListItem>
        <ListItem>사용자는 타인의 정보를 도용하거나 부정한 방법으로 서비스를 이용해서는 안 됩니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        2. 서비스 제공 및 변경
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>서비스는 사용자에게 계속적으로 제공되는 것을 보장하지않습니다. </ListItem>
        <ListItem>서비스 내용은 회사의 판단에 따라 변경될 수 있습니다.</ListItem>
        <ListItem>서비스의 변경 또는 중단으로 인한 손해에 대해 회사는 책임지지 않습니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        3. 정보 보안
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>사용자는 자신의 계정 정보를 안전하게 관리해야 합니다.</ListItem>
        <ListItem>계정 정보 유출로 인한 문제에 대한 책임은 사용자에게 있습니다.</ListItem>
        <ListItem>사용자는 서비스 이용 중에 보안에 관련된 취약점을 발견한 경우, 즉시 회사에 보고해야 합니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        4. 콘텐츠 이용
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>
          서비스 내의 콘텐츠(텍스트, 이미지, 동영상 등)는 컨셉BE 또는 해당 콘텐츠의 제공자의 소유물입니다.
        </ListItem>
        <ListItem>사용자는 서비스 내의 콘텐츠를 복제, 수정, 배포하는 등의 행위를 하지 않아야 합니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        5. 개인정보 처리
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>개인정보 처리에 관한 사항은 별도의 개인정보처리방침을 따릅니다. </ListItem>
        <ListItem>사용자의 개인정보는 관련 법령과 본 서비스의 개인정보처리방침에 따라 처리됩니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        6. 면책조항
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>서비스 사용으로 발생한 어떠한 손해에 대해서도 본 서비스는 책임지지 않습니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="c1">
        7. 타인의 아이디어 조회 관련 동의사항
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem
          style={{
            color: '#5F27FF',
          }}
        >
          게시글을 조회하면 내가 아이디어를 확인하였다는 사실이 자동으로 데이터베이스에 저장됩니다. (데이터베이스 저장
          내용 : 이용자의 식별 정보 - 이름, 이메일 주소, 사용자 고유 키값, 게시글 조회일자, 기타 소셜 로그인 통해 받아온
          사용자 정보)
        </ListItem>
        <ListItem
          style={{
            color: '#5F27FF',
          }}
        >
          아이디어 표절이나 도용 시 해당 사실을 근거로 불이익이 발생할 수 있습니다
        </ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b6">
        본 이용약관의 내용은 23.08.24에 업데이트되었습니다.
      </Text>
      <ButtonWrapper>
        <Button onClick={onClose}>확인</Button>
      </ButtonWrapper>
    </CollectionWrapper>
  );
};

export default Terms;
