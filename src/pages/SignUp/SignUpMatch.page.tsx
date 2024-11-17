import styled from '@emotion/styled';
import {
  Box,
  Button,
  CheckboxContainer,
  Flex,
  Header,
  RadioContainer,
  Spacer,
  SVGGoldBell,
  SVGRadioCheck24,
  SVGRadioUncheck24,
  Text,
  theme,
  useCheckbox,
  useRadio,
} from 'concept-be-design-system';
import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { OauthMemberInfo } from '../../types/login';
import {
  Sheet_Left,
  Sheet_leftItem,
  Sheet_radioDiv,
  Sheet_right,
  TwoDepthBottomSheet,
} from '../Write/components/TwoDepthBottomSheet';
import { useWritingInfoQuery } from '../Write/hooks/queries/useWritingInfoQuery';
import { get2DepthCountsBy1Depth } from '../Write/utils/get2DepthCountsBy1Depth';
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

  const [isOpenBranchBottomSheet, setIsOpenBranchBottomSheet] = useState(false);
  const [prevFormData, _] = useState(parseQueryString<QueryStringProps>);

  const { branches, purposes, recruitmentPlaces, cooperationWays, skillCategoryResponses } = useWritingInfoQuery();

  const { postSignUp } = useSignUpMutation();

  const { checkboxValue, selectedCheckboxId, onChangeCheckbox } = useCheckbox<CheckboxValue>({
    goal: purposes,
  });
  const { radioValue, selectedRadioName, onChangeRadio } = useRadio({
    cooperationWays,
  });

  const branchBottomSheetLeftItems = [] as any;
  const branchBottomSheetRightItems = [] as any;

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
        <Spacer size={80} />

        <Flex direction="column" justifyContent="center" alignItems="center" gap={4}>
          <SVGGoldBell />
          <Spacer size={16} />
          <Text font="suit14m" color="w1">
            참여하고자 하는 프로젝트 조건을 등록해주세요.
          </Text>
          <Text font="suit14m" color="w1">
            딱 맞는 모집 공고가 뜨면 알려드릴게요!
          </Text>
        </Flex>

        <Box
          marginTop={24}
          position="relative"
          padding="32px 22px 25px 22px"
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

          <Spacer size={35} />

          <RadioContainer
            label="협업 방식"
            radioKey="cooperationWays"
            options={radioValue.cooperationWays}
            onChange={(e) => onChangeRadio(e, 'cooperationWays')}
            gap="large"
            required
          />

          <Spacer size={35} />

          <Box>
            <Flex justifyContent="space-between">
              <Text font="suit15m" color="b9">
                분야
              </Text>
              <div
                onClick={() => {
                  setIsOpenBranchBottomSheet(true);
                }}
              >
                <Flex
                  padding="8px 12px"
                  border="1px solid #e5e5e5"
                  borderRadius={6}
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Text font="suit13m" color="b4" style={{ lineHeight: '20px' }}>
                    + 추가하기
                  </Text>
                </Flex>
              </div>
            </Flex>

            <TwoDepthBottomSheet
              title="분야 선택"
              isOpen={isOpenBranchBottomSheet}
              onClose={() => setIsOpenBranchBottomSheet(false)}
            >
              <Sheet_Left>
                {branchBottomSheetLeftItems.map((item: any) => {
                  return (
                    <Sheet_leftItem
                      key={item}
                      onClick={() => setSelectedTeamRecruitment1Depth(item)}
                      checked={selectedTeamRecruitment1Depth === item}
                    >
                      <Text font="suit14m" color={selectedTeamRecruitment1Depth === item ? 'b2' : 'ba'}>
                        {item}
                      </Text>
                      <Spacer size={3} />
                      <Text font="suit14m" color={selectedTeamRecruitment1Depth === item ? 'c1' : 'ba'}>
                        {get2DepthCountsBy1Depth(selectedSkillResponses, skillCategoryResponses)[item]}
                      </Text>
                    </Sheet_leftItem>
                  );
                })}
              </Sheet_Left>
              <Sheet_right>
                {branchBottomSheetRightItems.map((item: any) => {
                  return (
                    <Sheet_radioDiv key={item.name} onClick={() => onClickTeamRecruitment(item)}>
                      <Text font="suit14m" color="b4">
                        {item.name}
                      </Text>
                      {selectedSkillResponses.includes(item) ? <SVGRadioCheck24 /> : <SVGRadioUncheck24 />}
                    </Sheet_radioDiv>
                  );
                })}
              </Sheet_right>
            </TwoDepthBottomSheet>
          </Box>

          <Spacer size={100} />
        </Box>

        <Box padding="0 22px" backgroundColor="w1">
          <Button onClick={() => {}}>프로필 설정 완료</Button>
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
