import styled from '@emotion/styled';
import {
  Box,
  Button,
  CheckboxContainer,
  Flex,
  Header,
  RadioContainer,
  Spacer,
  SVGRadioCheck24,
  SVGRadioUncheck24,
  Tag,
  Text,
  theme,
  useCheckbox,
  useRadio,
} from 'concept-be-design-system';
import { FormEvent, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { useMemberInfoQuery } from '../Profile/hooks/queries/useMemberInfoQuery';
import { getUserId } from '../Profile/utils/getUserId';
import { SVGBellCircle } from '../SignUp/assets/SVGBellCircle';
import { useNotificationSettingsMutation } from '../SignUp/hooks/useNotificationSettingsMutation';
import { WORKING_PLACE_MAP } from '../SignUp/SignUpMatch.page';
import { WorkingPlaceType } from '../SignUp/types';
import { parseQueryString } from '../SignUp/utils/manageQueryString';
import {
  Sheet_Left,
  Sheet_leftItem,
  Sheet_radioDiv,
  Sheet_right,
  TwoDepthBottomSheet,
} from '../Write/components/TwoDepthBottomSheet';
import { useWritingInfoQuery } from '../Write/hooks/queries/useWritingInfoQuery';
import { Info } from '../Write/types';
import { get2DepthCountsBy1DepthBranches } from '../Write/utils/get2DepthCountBy1DepthBranches';
import usePutProfileMutation from './hooks/usePutProfileMutation';

interface QueryStringProps {
  nickname: string;
  mainSkillId: number;
  skills: {
    skillId: number;
    level: string;
  }[];
  profileImageUrl: string | null;
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

export default function ProfileEditMatchPage() {
  const openAlert = useAlert();

  const [isOpenBranchBottomSheet, setIsOpenBranchBottomSheet] = useState(false);
  const [prevFormData, _] = useState(parseQueryString<QueryStringProps>);

  const my = useMemberInfoQuery(getUserId());
  const { branches, purposes, cooperationWays } = useWritingInfoQuery();

  const { putProfile } = usePutProfileMutation(getUserId(), prevFormData.nickname);
  const { postNotificationSettings } = useNotificationSettingsMutation();

  const { checkboxValue, selectedCheckboxId, onChangeCheckbox } = useCheckbox<CheckboxValue>({
    goal: purposes.map((purpose) => ({
      ...purpose,
      checked: my.joinPurposes.includes(purpose.name),
    })),
  });
  const { radioValue, selectedRadioName, onChangeRadio } = useRadio({
    cooperationWays,
  });

  const [selectedBranch1Depth, setSelectedBranch1Depth] = useState(branches[0].name);
  const [selectedBranchResponses, setSelectedBranchResponses] = useState<Info[]>([]);

  const branchBottomSheetLeftItems = branches.map((item) => item.name);
  const branchBottomSheetRightItems = branches.find((item) => item.name === selectedBranch1Depth)?.branchResponses;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedCheckboxId.goal.length === 0) {
      openAlert({ content: '가입 목적을 하나 이상 선택해 주세요.' });
      return;
    }

    if (!selectedBranchResponses.length) {
      openAlert({ content: '분야를 1개 이상 선택해 주세요.' });
      return;
    }

    if (!selectedRadioName.cooperationWays) {
      openAlert({ content: '협업 방식을 선택해 주세요.' });
      return;
    }

    putProfile(
      {
        ...prevFormData,
        joinPurposes: selectedCheckboxId.goal,
      },
      {
        onSuccess: () => {
          postNotificationSettings({
            purposeIds: selectedCheckboxId.goal,
            branchIds: selectedBranchResponses.map((item) => item.id),
            cooperationWay: WORKING_PLACE_MAP[
              selectedRadioName.cooperationWays as keyof typeof WORKING_PLACE_MAP
            ] as WorkingPlaceType,
          });
        },
      },
    );
  };

  const onClickBranch = (selected: Info) => {
    if (selectedBranchResponses.length >= 10) {
      openAlert({ content: '최대 10개까지 선택할 수 있습니다.' });
      return;
    }

    setSelectedBranchResponses((prev) =>
      selectedBranchResponses.includes(selected) ? prev.filter((item) => item.id !== selected.id) : [...prev, selected],
    );
  };

  const onDeleteBranch = (id: number) => {
    setSelectedBranchResponses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box paddingBottom={34}>
      <Header main>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
        <Header.Item>
          <Text font="suit16sb" color="w1">
            프로젝트 매칭 수정
          </Text>
        </Header.Item>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
      </Header>

      <MainWrapper onSubmit={onSubmit}>
        <Spacer size={80} />

        <Flex direction="column" justifyContent="center" alignItems="center" gap={4}>
          <SVGBellCircle />
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

          <Spacer size={24} />

          <Box>
            <Flex justifyContent="space-between" alignItems="end">
              <Text font="suit15m" color="b9" required>
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
                      onClick={() => setSelectedBranch1Depth(item)}
                      checked={selectedBranch1Depth === item}
                    >
                      <Text font="suit14m" color={selectedBranch1Depth === item ? 'b2' : 'ba'}>
                        {item}
                      </Text>
                      <Spacer size={3} />
                      <Text font="suit14m" color={selectedBranch1Depth === item ? 'c1' : 'ba'}>
                        {get2DepthCountsBy1DepthBranches(selectedBranchResponses, branches)[item]}
                      </Text>
                    </Sheet_leftItem>
                  );
                })}
              </Sheet_Left>
              <Sheet_right>
                {branchBottomSheetRightItems?.map((item: any) => {
                  return (
                    <Sheet_radioDiv key={item.name} onClick={() => onClickBranch(item)}>
                      <Text font="suit14m" color="b4">
                        {item.name}
                      </Text>
                      {selectedBranchResponses.includes(item) ? <SVGRadioCheck24 /> : <SVGRadioUncheck24 />}
                    </Sheet_radioDiv>
                  );
                })}
              </Sheet_right>
            </TwoDepthBottomSheet>
          </Box>

          <Spacer size={12} />
          <TeamLabelBox>
            {selectedBranchResponses.map((item) => {
              return (
                <Tag key={item.id} onDelete={() => onDeleteBranch(item.id)} style={{ borderRadius: 100 }}>
                  {item.name}
                </Tag>
              );
            })}
          </TeamLabelBox>

          <Spacer size={100} />
        </Box>

        <Box padding="0 22px" backgroundColor="w1">
          <Button type="submit">프로필 수정 완료</Button>
        </Box>
      </MainWrapper>
    </Box>
  );
}

const MainWrapper = styled.form`
  background-color: ${theme.color.c1};
  height: 100%;
`;

const TeamLabelBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
