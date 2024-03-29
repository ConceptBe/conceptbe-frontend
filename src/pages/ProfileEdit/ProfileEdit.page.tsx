import styled from '@emotion/styled';
import {
  useCheckbox,
  useField,
  Button,
  CheckboxContainer,
  Dropdown,
  Field,
  Text,
  theme,
  Header,
  Spacer,
  Tag,
  SVGLoginImageWrite,
  useDropdown,
  Flex,
  Box,
  ImageView,
  PNGDefaultProfileInfo100,
} from 'concept-be-design-system';
import { FormEvent } from 'react';

import useProfileEditQuery from './hooks/useProfileEditQuery.ts';
import usePutProfileMutation from './hooks/usePutProfileMutation.ts';
import { DropdownValue, FieldValue } from './types';
import Back from '../../layouts/Back.tsx';
import { getUserId } from '../Profile/utils/getUserId.ts';
import useCheckDuplicateNickname from '../SignUp/hooks/useCheckDuplicateNickname.ts';
import useSetDetailSkills from '../SignUp/hooks/useSetDetailSkills.ts';

interface CheckboxValue {
  goal: CheckboxOption[];
}

interface CheckboxOption {
  id: number;
  name: string;
  checked: boolean;
}

const ProfileEdit = () => {
  const { mainSkills, detailSkills, skillLevels, regions, purposes, my } = useProfileEditQuery();
  const { fieldValue, fieldErrorValue, setFieldErrorValue, onChangeField } = useField<FieldValue>({
    nickname: my.nickname ?? '',
    company: my.workingPlace ?? '',
    intro: my.introduction ?? '',
  });
  const { checkboxValue, onChangeCheckbox } = useCheckbox<CheckboxValue>({
    goal: my.joinPurposes ?? purposes,
  });
  const { dropdownValue, onResetDropdown, onClickDropdown } = useDropdown<DropdownValue>({
    mainSkill: my.mainSkill ?? '',
    skillDepthOne: '',
    skillDepthTwo: '',
    skillDepthThree: '',
    region: my.livingPlace ?? '',
  });
  const { skillDepthOneId, selectedSkillDepths, onDeleteSkill } = useSetDetailSkills({
    initialValue: my.skills,
    mainSkills,
    detailSkills,
    dropdownValue,
    onResetDropdown,
  });
  const { putProfile } = usePutProfileMutation(getUserId(), fieldValue.nickname);

  useCheckDuplicateNickname({ nickname: fieldValue.nickname, setFieldErrorValue });

  const validateInput = () => {
    return [
      {
        validateFn: (input: string) => /[~!@#$%";'^,&*()_+|</>=>`?:{[\]}\s]/g.test(input),
        errorMessage: '사용 불가한 닉네임입니다.',
      },
      {
        validateFn: (input: string) => input.length < 2,
        errorMessage: '두 글자 이상의 닉네임으로 입력해 주세요.',
      },
    ];
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    putProfile({
      nickname: fieldValue.nickname,
      mainSkillId: mainSkills.find(({ name }) => dropdownValue.mainSkill === name)?.id || 0,
      profileImageUrl: my.profileImageUrl || '',
      skills: selectedSkillDepths.map(({ id, name }) => ({ skillId: id, level: name.split(', ')[1] })),
      joinPurposes: checkboxValue.goal.filter(({ checked }) => checked).map(({ id }) => id),
      livingPlace: dropdownValue.region,
      workingPlace: fieldValue.company,
      introduction: fieldValue.intro,
    });
  };

  return (
    <Box paddingBottom={34}>
      <Header main>
        <Header.Item>
          <Back />
        </Header.Item>
        <Header.Item>
          <Text font="suit16sb" color="w1">
            프로필 수정
          </Text>
        </Header.Item>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
      </Header>

      <MainWrapper onSubmit={onSubmit}>
        <Spacer size={20} />
        <Box
          marginTop={100}
          position="relative"
          padding="0 22px 25px 22px"
          borderRadius="16px 16px 0 0"
          backgroundColor="w1"
        >
          <Box position="relative" top={-50} left={0} right={0} margin="auto" width={100} height={100} cursor="pointer">
            <Box width={100} height={100} overflow="hidden" borderRadius="0 150px 150px 0">
              <ImageView src={my.profileImageUrl} alt="프로필 이미지" defaultSrc={PNGDefaultProfileInfo100} />
            </Box>
            <Flex
              justifyContent="center"
              alignItems="center"
              border="1px solid #e6e6e6"
              borderRadius="50%"
              width={32}
              height={32}
              backgroundColor="w1"
              position="absolute"
              shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px"
              bottom={0}
              right={0}
            >
              <SVGLoginImageWrite />
            </Flex>
          </Box>

          <Field
            label="닉네임"
            value={fieldValue.nickname}
            onChange={onChangeField}
            onValidate={validateInput}
            maxLength={10}
            required
          >
            <Field.Input
              name="nickname"
              placeholder={`현재 닉네임 : ${my.nickname}`}
              errorValue={fieldErrorValue.nickname}
              successMessage="사용 가능한 닉네임입니다."
              autoFocus
            />
          </Field>

          <Spacer size={35} />

          <Flex direction="column" gap={13}>
            <Text required font="suit15m" color="b9">
              대표 스킬
            </Text>
            <Flex wrap="wrap" gap={8}>
              <Dropdown selectedValue={dropdownValue.mainSkill} initialValue="대분류">
                {mainSkills.map(({ id, name }) => (
                  <Dropdown.Item
                    key={id}
                    value={name}
                    onClick={(value) => {
                      onClickDropdown(value, 'mainSkill');
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </Flex>
          </Flex>

          <Spacer size={35} />

          <Flex direction="column" gap={13}>
            <Text required font="suit15m" color="b9">
              세부 스킬 (최대 3개)
            </Text>
            <Flex wrap="wrap" gap={8}>
              <Dropdown
                disabled={selectedSkillDepths.length === 3}
                selectedValue={dropdownValue.skillDepthOne}
                initialValue="대분류"
              >
                {mainSkills.map(({ id, name }) => (
                  <Dropdown.Item
                    key={id}
                    value={name}
                    onClick={(value) => {
                      onClickDropdown(value, 'skillDepthOne');
                      onResetDropdown('skillDepthTwo');
                      onResetDropdown('skillDepthThree');
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown>
              <Dropdown
                disabled={selectedSkillDepths.length === 3}
                selectedValue={dropdownValue.skillDepthTwo}
                initialValue="상세분류"
              >
                {skillDepthOneId &&
                  detailSkills[skillDepthOneId].map(({ id, name }) => (
                    <Dropdown.Item
                      key={id}
                      value={name}
                      onClick={(value) => {
                        onClickDropdown(value, 'skillDepthTwo');
                      }}
                    >
                      {name}
                    </Dropdown.Item>
                  ))}
              </Dropdown>
              <Dropdown
                disabled={selectedSkillDepths.length === 3}
                selectedValue={dropdownValue.skillDepthThree}
                initialValue="숙련도"
              >
                {skillLevels.map(({ id, name }) => (
                  <Dropdown.Item
                    key={id}
                    value={name}
                    onClick={(value) => {
                      onClickDropdown(value, 'skillDepthThree');
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </Flex>
            {selectedSkillDepths.length > 0 && (
              <Flex wrap="wrap" gap={6}>
                {selectedSkillDepths.map((skill, idx) => {
                  return (
                    <Tag key={idx} onDelete={onDeleteSkill}>
                      {skill.name}
                    </Tag>
                  );
                })}
              </Flex>
            )}
          </Flex>

          <Spacer size={35} />

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

          <Flex direction="column" gap={13}>
            <Text font="suit15m" color="b9">
              지역
            </Text>
            <Dropdown selectedValue={dropdownValue.region} initialValue="시/도/광역시">
              {regions.map(({ id, name }) => (
                <Dropdown.Item
                  key={id}
                  value={name}
                  onClick={(value) => {
                    onClickDropdown(value, 'region');
                  }}
                >
                  {name}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </Flex>

          <Spacer size={35} />

          <Field
            label="직장명"
            value={fieldValue.company}
            onChange={onChangeField}
            onValidate={validateInput}
            maxLength={10}
          >
            <Field.Input name="company" placeholder="직장명을 입력해주세요" />
          </Field>

          <Spacer size={35} />

          <Field
            label="자기소개"
            value={fieldValue.intro}
            onChange={onChangeField}
            onValidate={validateInput}
            maxLength={150}
          >
            <Field.Textarea name="intro" placeholder="자기소개를 입력해 주세요. (최대 150자)" />
          </Field>
        </Box>
        <Box padding="0 22px" backgroundColor="w1">
          <Button>프로필 수정하기</Button>
        </Box>
      </MainWrapper>
    </Box>
  );
};

const MainWrapper = styled.form`
  background-color: ${theme.color.c1};
  height: 100%;
`;

export default ProfileEdit;
