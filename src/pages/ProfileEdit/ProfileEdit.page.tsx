import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dropdown,
  Field,
  Flex,
  Header,
  ImageView,
  PNGDefaultProfileInfo100,
  SVGLoginImageWrite,
  Spacer,
  Tag,
  Text,
  theme,
  useDropdown,
  useField,
} from 'concept-be-design-system';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as SVGToolTip24 } from '../../../public/assets/tool_tip_24.svg';
import { NICKNAME_REG_EXP } from '../../constants/index.ts';
import useAlert from '../../hooks/useAlert.tsx';
import Back from '../../layouts/Back.tsx';
import useCheckDuplicateNickname from '../SignUp/hooks/useCheckDuplicateNickname.ts';
import useDefaultProfileImage from '../SignUp/hooks/useDefaultProfileImage.ts';
import useSetDetailSkills from '../SignUp/hooks/useSetDetailSkills.ts';
import { clearSessionData, getSessionData, setSessionData } from '../SignUp/utils/manageQueryString.ts';
import useProfileEditQuery from './hooks/useProfileEditQuery.ts';
import { convertSelectedSkills } from './service/convertProfileQuery.ts';
import { DropdownValue, FieldValue } from './types';

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

const ProfileEdit = () => {
  const { state: urlState }: { state: { isInit: boolean } } = useLocation();
  const prevInputtedData = getSessionData('profileEditData') as QueryStringProps | undefined;

  const navigate = useNavigate();
  const openAlert = useAlert();
  const { mainSkills, detailSkills, skillLevels, regions, my } = useProfileEditQuery();
  const { fieldValue, fieldErrorValue, setFieldErrorValue, onChangeField } = useField<FieldValue>({
    nickname: prevInputtedData?.nickname ?? my.nickname ?? '',
    company: prevInputtedData?.workingPlace ?? my.workingPlace ?? '',
    intro: prevInputtedData?.introduction ?? my.introduction ?? '',
  });
  const { dropdownValue, onResetDropdown, onClickDropdown } = useDropdown<DropdownValue>({
    mainSkill: mainSkills.find(({ id }) => id === prevInputtedData?.mainSkillId)?.name ?? my.mainSkill ?? '',
    skillDepthOne: '',
    skillDepthTwo: '',
    skillDepthThree: '',
    region: regions.find((place) => place.id === prevInputtedData?.livingPlaceId)?.name ?? my.livingPlace ?? '',
  });

  const initialDetailSkills = convertSelectedSkills(
    prevInputtedData?.skills.map((skill) => ({
      ...skill,
      skillName:
        Object.values(detailSkills)
          .flat()
          .find(({ id }) => id === skill.skillId)
          ?.name.split(',')[0] ?? 'unknown',
    })),
  );

  const { skillDepthOneId, selectedSkillDepths, onDeleteSkill } = useSetDetailSkills({
    initialValue: initialDetailSkills.length > 0 ? initialDetailSkills : my.skills,
    mainSkills,
    detailSkills,
    dropdownValue,
    onResetDropdown,
  });
  const { profileImageUrl, onClickSetDefaultProfileImage } = useDefaultProfileImage({
    currentProfileImage: my.profileImageUrl,
    defaultProfileImage: PNGDefaultProfileInfo100,
  });

  useCheckDuplicateNickname({ nickname: fieldValue.nickname, setFieldErrorValue });

  useEffect(() => {
    if (urlState?.isInit) {
      clearSessionData('profileEditData');
    }
  }, []);

  const validateInput = () => {
    return [
      {
        validateFn: (input: string) => NICKNAME_REG_EXP.test(input),
        errorMessage: '사용 불가한 닉네임입니다.',
      },
      {
        validateFn: (input: string) => input.length < 2,
        errorMessage: '두 글자 이상의 닉네임으로 입력해 주세요.',
      },
    ];
  };

  const formData = {
    nickname: fieldValue.nickname,
    mainSkillId: mainSkills.find(({ name }) => dropdownValue.mainSkill === name)?.id || 0,
    profileImageUrl: profileImageUrl === PNGDefaultProfileInfo100 ? null : my.profileImageUrl,
    skills: selectedSkillDepths.map(({ id, name }) => ({ skillId: id, level: name.split(', ')[1] })),
    livingPlaceId: regions.find((place) => place.name === dropdownValue.region)?.id || 1,
    workingPlace: fieldValue.company,
    introduction: fieldValue.intro,
  };

  const onClickNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!fieldValue.nickname) return openAlert({ content: '닉네임은 필수 값입니다.' });
    if (!dropdownValue.mainSkill) return openAlert({ content: '대표 스킬은 필수 값입니다.' });
    if (selectedSkillDepths.length === 0) return openAlert({ content: '세부 스킬은 최소 한 개 이상 선택해주세요.' });

    setSessionData('profileEditData', formData);
    navigate('/profile-edit-match');
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

      <MainWrapper>
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
              <ImageView src={profileImageUrl} alt="프로필 이미지" defaultSrc={PNGDefaultProfileInfo100} />
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
              onClick={onClickSetDefaultProfileImage}
            >
              <SVGLoginImageWrite />
            </Flex>
          </Box>

          <Flex gap={6}>
            <Text font="suit15m" color="b9">
              이메일
            </Text>
            <SVGToolTip24
              width={15}
              height={15}
              onClick={() =>
                openAlert({
                  content: '가입 시 등록한 이메일입니다. 확인용이며 본인 외 다른 사람에게 노출되지 않습니다.',
                })
              }
              cursor="pointer"
            />
          </Flex>
          <Spacer size={12} />
          <Text font="suit15m" color="b4">
            {my.email}
          </Text>

          <Spacer size={35} />

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
              placeholder="수정할 닉네임을 입력해주세요."
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
                    <Tag key={idx} onDelete={onDeleteSkill} css={{ borderRadius: 50 }}>
                      {skill.name}
                    </Tag>
                  );
                })}
              </Flex>
            )}
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
            <Field.Input name="company" placeholder="직장명을 입력해주세요." />
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
          <Button onClick={onClickNextStep}>다음으로</Button>
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
