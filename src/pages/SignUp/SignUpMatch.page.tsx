import styled from '@emotion/styled';
import {
  Box,
  CheckboxContainer,
  Flex,
  Header,
  RadioContainer,
  Spacer,
  Text,
  theme,
  useCheckbox,
  useRadio,
} from 'concept-be-design-system';
import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { OauthMemberInfo } from '../../types/login';
import { useWritingInfoQuery } from '../Write/hooks/queries/useWritingInfoQuery';
import useSignUpMutation from './hooks/useSignUpMutation';
import { parseQueryString } from './utils/manageQueryString';

interface QueryStringProps {
  nickname: string;
  mainSkillId: number;
  skills: {
    skillId: number;
    level: string;
  }[];
  joinPurposes: number[];
  livingPlaceId: number;
  workingPlace: string;
  introduction: string;
}

interface CheckboxValue {
  goal: CheckboxOption[];
}

interface CheckboxOption {
  id: number;
  name: string;
  checked: boolean;
}

const SignUpMatchPage = () => {
  const openAlert = useAlert();
  const { state: memberInfo }: { state: OauthMemberInfo | null } = useLocation();

  const [prevFormData, _] = useState(parseQueryString<QueryStringProps>);

  const { branches, purposes, recruitmentPlaces, cooperationWays, skillCategoryResponses } = useWritingInfoQuery();

  const { postSignUp } = useSignUpMutation();

  const { checkboxValue, selectedCheckboxId, onChangeCheckbox } = useCheckbox<CheckboxValue>({
    goal: purposes,
  });
  const { radioValue, selectedRadioName, onChangeRadio } = useRadio({
    cooperationWays,
  });

  // useValidateUserInfo(memberInfo);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!memberInfo) return openAlert({ content: '유저 정보가 없습니다. 잘못된 접근 방법입니다.' });

    postSignUp({
      ...memberInfo,
      ...prevFormData,
      joinPurposes: selectedCheckboxId.goal,
    });
  };

  return (
    <Box paddingBottom={34}>
      <Header main>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
        <Header.Item>
          <Text font="suit16sb" color="w1">
            프로젝트 매칭 설정
          </Text>
        </Header.Item>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
      </Header>

      <MainWrapper>
        <Spacer size={100} />
        <Box
          marginTop={100}
          position="relative"
          padding="0 22px 25px 22px"
          borderRadius="16px 16px 0 0"
          backgroundColor="w1"
        >
          <Flex direction="column" gap={13}>
            <CheckboxContainer
              label="가입 목적 (최대 3개)"
              checkboxKey="goal"
              options={checkboxValue.goal}
              onChange={onChangeCheckbox}
              maxCount={3}
              required
            />
          </Flex>

          <RadioContainer
            label="협업 방식"
            radioKey="cooperationWays"
            options={radioValue.cooperationWays}
            onChange={(e) => onChangeRadio(e, 'cooperationWays')}
            gap="large"
            required
          />

          {/* <CheckboxContainer
            label="분야"
            checkboxKey="branches"
            options={checkboxValue.branches}
            onChange={onChangeCheckbox}
            required
          /> */}
        </Box>
      </MainWrapper>
    </Box>
  );
};

const MainWrapper = styled.form`
  background-color: ${theme.color.c1};
  height: 100%;
`;

export default SignUpMatchPage;
