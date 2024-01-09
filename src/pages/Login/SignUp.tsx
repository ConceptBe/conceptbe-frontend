import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
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
  SVGImageWrite,
  useDropdown,
} from 'concept-be-design-system';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { postSignUp } from '../../api/index.ts';
import useSignUpQuery from '../../hooks/api/useSignUpQuery.ts';
import { OauthMemberInfo } from '../../types/login.ts';
import { Skill } from '../../types/signUp.ts';

interface FieldValue {
  nickname: string;
  company: string;
  intro: string;
}

interface CheckboxValue {
  goal: CheckboxOption[];
}

interface CheckboxOption {
  id: number;
  name: string;
  checked: boolean;
}

interface DropdownValue {
  mainSkill: string;
  skillDepthOne: string;
  skillDepthTwo: string;
  skillDepthThree: string;
  region: string;
}

const SignUp = () => {
  const { state: memberInfo }: { state: OauthMemberInfo } = useLocation();
  const mutation = useMutation({ mutationFn: postSignUp });
  const { mainSkillQuery, detailSkillQuery, skillLevelQuery, regionQuery, checkboxQuery } = useSignUpQuery();
  const { fieldValue, fieldErrorValue, onChangeField } = useField<FieldValue>({
    nickname: '',
    company: '',
    intro: '',
  });
  const { checkboxValue, onChangeCheckbox } = useCheckbox<CheckboxValue>({
    goal: checkboxQuery,
  });
  const [selectedSkillDepths, setSelectedSkillDepths] = useState<Skill[]>([]);
  const { dropdownValue, onResetDropdown, onClickDropdown } = useDropdown<DropdownValue>({
    mainSkill: '',
    skillDepthOne: '',
    skillDepthTwo: '',
    skillDepthThree: '',
    region: '',
  });
  const skillDepthOneId = mainSkillQuery.find(({ name }) => name === dropdownValue.skillDepthOne)?.id;

  const validateInput = () => {
    return [
      {
        regexp: /[~!@#$%";'^,&*()_+|</>=>`?:{[\]}]/g,
        name: 'nickname',
        errorMessage: '사용 불가한 닉네임입니다.',
      },
    ];
  };

  const onClickDropdownSetting = useCallback(() => {
    if (!skillDepthOneId) return;

    const selectedValue = `${dropdownValue.skillDepthTwo}, ${dropdownValue.skillDepthThree}`;
    const selectedId = detailSkillQuery[skillDepthOneId].find(({ name }) => name === dropdownValue.skillDepthTwo)?.id;

    if (selectedId && selectedSkillDepths.length < 3) {
      setSelectedSkillDepths((prev) => [...prev, { id: selectedId, name: selectedValue }]);
      onResetDropdown('skillDepthOne');
      onResetDropdown('skillDepthTwo');
      onResetDropdown('skillDepthThree');
    }
  }, [detailSkillQuery, skillDepthOneId, selectedSkillDepths, dropdownValue, onResetDropdown]);

  const onDeleteSkill = (value: string) => {
    setSelectedSkillDepths(selectedSkillDepths.filter(({ name }) => name !== value));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      fieldErrorValue.nickname ||
      !fieldValue.nickname ||
      !dropdownValue.mainSkill ||
      selectedSkillDepths.length === 0 ||
      checkboxValue.goal.length === 0
    ) {
      alert('잘못된 입력입니다.');
    }

    mutation.mutate({
      nickname: fieldValue.nickname,
      mainSkillId: mainSkillQuery.find(({ name }) => dropdownValue.mainSkill === name)?.id || 0,
      profileImageUrl: memberInfo.profileImageUrl,
      skills: selectedSkillDepths.map(({ id, name }) => ({ skillId: id, level: name.split(', ')[1] })),
      joinPurposes: checkboxValue.goal.filter(({ checked }) => checked).map(({ id }) => id),
      livingPlace: dropdownValue.region,
      workingPlace: fieldValue.company,
      email: memberInfo.email,
      oauthId: memberInfo.oauthId,
      oauthServerType: memberInfo.oauthServerType,
    });
  };

  useEffect(() => {
    if (dropdownValue.skillDepthThree === '' || !dropdownValue.skillDepthTwo) return;
    onClickDropdownSetting();
  }, [dropdownValue, onClickDropdownSetting]);

  return (
    <Container>
      <Header main>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
        <Header.Item>
          <Text font="suit16sb" color="w1">
            프로필 설정
          </Text>
        </Header.Item>
        <Header.Item>
          <Spacer size={24} />
        </Header.Item>
      </Header>

      <MainWrapper onSubmit={onSubmit}>
        <Spacer size={20} />
        <MainBox>
          <ImageWrapper>
            <ImageBox>
              <Img src={memberInfo.profileImageUrl} />
            </ImageBox>
            <ImageWrite>
              <SVGImageWrite />
            </ImageWrite>
          </ImageWrapper>

          <Field label="닉네임" value={fieldValue.nickname} maxLength={10} isRequired>
            <Field.Input
              name="nickname"
              onChange={onChangeField}
              onValidate={validateInput}
              placeholder="닉네임을 입력해주세요"
              errorMessage={fieldErrorValue.nickname}
              successMessage="사용 가능한 닉네임입니다."
            />
          </Field>

          <Spacer size={35} />

          <SettingWrapper>
            <Text required font="suit15m" color="b9">
              대표 스킬
            </Text>
            <SettingBox>
              <Dropdown selectedValue={dropdownValue.mainSkill} initialValue="대분류">
                {mainSkillQuery.map(({ id, name }) => (
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
            </SettingBox>
          </SettingWrapper>

          <Spacer size={35} />

          <SettingWrapper>
            <Text required font="suit15m" color="b9">
              세부 스킬 (최대 3개)
            </Text>
            <SettingBox>
              <Dropdown
                disabled={selectedSkillDepths.length === 3}
                selectedValue={dropdownValue.skillDepthOne}
                initialValue="대분류"
              >
                {mainSkillQuery.map(({ id, name }) => (
                  <Dropdown.Item
                    key={id}
                    value={name}
                    onClick={(value) => {
                      onClickDropdown(value, 'skillDepthOne');
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
                  detailSkillQuery[skillDepthOneId].map(({ id, name }) => (
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
                {skillLevelQuery.map(({ id, name }) => (
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
            </SettingBox>
            {selectedSkillDepths.length > 0 && (
              <TagBox>
                {selectedSkillDepths.map((skill, idx) => {
                  return <Tag key={idx} text={skill.name} onDelete={onDeleteSkill} />;
                })}
              </TagBox>
            )}
          </SettingWrapper>

          <Spacer size={35} />

          <SettingWrapper>
            <Text required font="suit15m" color="b9">
              목적 (최대 3개)
            </Text>
            <CheckboxContainer
              nameKey="goal"
              options={checkboxValue.goal}
              onChange={(e) => onChangeCheckbox(e, 'goal', { checkboxKey: 'goal', maxValue: 3 })}
            />
          </SettingWrapper>

          <Spacer size={35} />

          <SettingWrapper>
            <Text font="suit15m" color="b9">
              지역
            </Text>
            <Dropdown selectedValue={dropdownValue.region} initialValue="시/도/광역시">
              {regionQuery.map(({ id, name }) => (
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
          </SettingWrapper>

          <Spacer size={35} />

          <Field label="직장명" value={fieldValue.company} maxLength={10}>
            <Field.Input
              name="company"
              onChange={onChangeField}
              onValidate={validateInput}
              placeholder="직장명을 입력해주세요"
            />
          </Field>

          <Spacer size={35} />

          <Field label="자기소개" value={fieldValue.intro} maxLength={150}>
            <Field.Textarea
              name="intro"
              onChange={onChangeField}
              onValidate={validateInput}
              placeholder="자기소개를 입력해 주세요. (최대 150자)"
              errorMessage={fieldErrorValue.intro}
            />
          </Field>
        </MainBox>
        <BottomWrapper>
          <Button onClick={() => {}}>프로필 저장하기</Button>
        </BottomWrapper>
      </MainWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 100px;
`;

const MainWrapper = styled.form`
  background-color: ${theme.color.c1};
  height: 100%;
`;

const MainBox = styled.div`
  background-color: ${theme.color.w1};
  border-radius: 16px 16px 0 0;
  padding: 0 22px 25px 22px;
  margin-top: 100px;
  position: relative;
`;

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const SettingBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ImageWrapper = styled.div`
  position: relative;
  top: -50px;
  left: 0;
  right: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const ImageBox = styled.div`
  border-radius: 0 150px 150px 0;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageWrite = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${theme.color.w1};
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 50%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px;
`;

const BottomWrapper = styled.div`
  padding: 0 22px;
  background: ${theme.color.w1};
`;

export default SignUp;
