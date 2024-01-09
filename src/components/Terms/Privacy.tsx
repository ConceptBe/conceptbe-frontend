import styled from '@emotion/styled';
import { Button, Spacer, Text, theme } from 'concept-be-design-system';

interface props {
  onClose: () => void;
}

const Privacy = ({ onClose }: props) => {
  return (
    <CollectionWrapper>
      <Text font="suit18sb" color="b2">
        개인정보 수집 및 이용 동의
      </Text>
      <Spacer size={16} />
      <Text font="suit14r" color="b6" customStyle={{ lineHeight: '22px' }}>
        본 개인정보처리방침은 컨셉BE에서 제공하는 서비스 이용과 관련하여 사용자의 개인정보 보호에 대한 내용을
        설명합니다. 서비스를 이용함으로써 사용자는 본 방침에 동의하는 것으로 간주됩니다.
      </Text>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        1. 수집하는 개인정보의 종류 및 목적
      </Text>
      <Spacer size={10} />

      <UnorderedList>
        <OrderedList>서비스는 다음과 같은 개인정보를 수집할 수 있습니다:</OrderedList>
        <ListItem>이용자의 식별 정보 (이름, 이메일 주소 등)</ListItem>
        <ListItem>서비스 이용 기록 (접속 로그, 활동 내역 등)</ListItem>
        <OrderedList>수집된 개인정보는 다음과 같은 목적으로 사용될 수 있습니다:</OrderedList>
        <ListItem>서비스 제공 및 관리</ListItem>
        <ListItem> 사용자에게 서비스 관련 정보 제공 </ListItem>
        <ListItem> 서비스 개선 및 사용자 경험 향상 </ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        2. 개인정보의 보유 및 이용 기간
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>
          개인정보는 사용자가 서비스를 이용하는 동안에 한하여 보유되며, 서비스 이용 종료 시에는 관련 법령과 내부 방침에
          따라 즉시 파기됩니다.{' '}
        </ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        3. 개인정보의 제3자 제공
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>서비스는 사용자의 개인정보를 제3자에게 제공하지 않습니다.</ListItem>
        <ListItem>
          다만, 법률적인 의무를 준수하거나 사용자의 동의가 있는 경우에는 예외적으로 제공될 수 있습니다.
        </ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        4. 개인정보의 보안 조치
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>서비스는 개인정보를 보호하기 위해 적절한 보안 조치를 취합니다.</ListItem>
        <ListItem>개인정보의 무단 접근, 유출, 변조, 손상 등을 방지하기 위한 노력을 기울이고 있습니다.</ListItem>
      </UnorderedList>
      <Spacer size={20} />
      <Text font="suit14sm" color="b2">
        5. 개인정보에 대한 사용자의 권리
      </Text>
      <Spacer size={10} />
      <UnorderedList>
        <ListItem>사용자는 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다.</ListItem>
        <ListItem>또한 개인정보 처리에 대한 동의 철회도 가능합니다. </ListItem>
        <ListItem>이에 관한 요청은 [연락처 정보]로 문의하시기 바랍니다. </ListItem>
        <ListItem>
          본 개인정보처리방침의 내용은 변경될 수 있으며, 변경 시에는 서비스를 통해 사전 공지할 것입니다.
        </ListItem>
      </UnorderedList>
      <Spacer size={20} />

      <Text font="suit14sm" color="b6">
        본 이용약관의 내용은 23.08.24에 업데이트되었습니다.
      </Text>

      <Spacer size={20} />

      <ButtonWrapper>
        <Button onClick={onClose}>확인</Button>
      </ButtonWrapper>
    </CollectionWrapper>
  );
};

const CollectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 22px 0 22px;
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

const OrderedList = styled.ol`
  color: ${theme.color.b6};
  font-size: 14px;
  font-weight: 400;
`;

const ButtonWrapper = styled.div`
  position: sticky;
  box-sizing: border-box;
  width: auto;
  bottom: 0;
  display: flex;
  padding: 0 22px 20px 22px;
  width: 100%;
  background-color: #fff;
`;

export default Privacy;
