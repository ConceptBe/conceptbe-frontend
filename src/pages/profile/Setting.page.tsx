import styled from '@emotion/styled';
import {
  useCheckbox,
  useField,
  Button,
  CheckboxContainer,
  Dropdown,
  Field,
  Header,
  Spacer,
  Tag,
  Text,
  theme,
  SVGLoginImageWrite,
  useDropdown,
} from 'concept-be-design-system';
import { useCallback, useEffect, useState } from 'react';

import Back from '../../layouts/Back';
import {
  filterSubOptions,
  MAIN_SKILL_QUERY,
  DETAIL_SKILL_QUERY,
  SKILL_DEPTH_THREE_LIST,
  REGION_LIST,
} from '../../modules/constants';
import { Skill } from '../../types/signUp';

interface FormValueType {
  nickName: string;
  company: string;
  intro: string;
}

interface DropdownValue {
  mainSkill: string;
  skillDepthOne: string;
  skillDepthTwo: string;
  skillDepthThree: string;
  region: string;
}

const Setting = () => {
  const { fieldValue, fieldErrorValue, onChangeField } = useField<FormValueType>({
    nickName: '',
    company: '',
    intro: '',
  });
  const { checkboxValue, onChangeCheckbox } = useCheckbox({
    goal: filterSubOptions,
  });
  const { dropdownValue, onResetDropdown, onClickDropdown } = useDropdown<DropdownValue>({
    mainSkill: '',
    skillDepthOne: '',
    skillDepthTwo: '',
    skillDepthThree: '',
    region: '',
  });
  const [selectedSkillDepths, setSelectedSkillDepths] = useState<Skill[]>([]);
  const skillDepthOneId = MAIN_SKILL_QUERY.find(({ name }) => name === dropdownValue.skillDepthOne)?.id;

  const onClickDropdownSetting = useCallback(() => {
    if (!skillDepthOneId) return;

    const selectedValue = `${dropdownValue.skillDepthTwo}, ${dropdownValue.skillDepthThree}`;
    const selectedId = DETAIL_SKILL_QUERY[skillDepthOneId].find(({ name }) => name === dropdownValue.skillDepthTwo)?.id;

    if (selectedId && selectedSkillDepths.length < 3) {
      setSelectedSkillDepths((prev) => [...prev, { id: selectedId, name: selectedValue }]);
      onResetDropdown('skillDepthOne');
      onResetDropdown('skillDepthTwo');
      onResetDropdown('skillDepthThree');
    }
  }, [skillDepthOneId, selectedSkillDepths, dropdownValue, onResetDropdown]);

  const onDeleteSkill = (value: string) => {
    setSelectedSkillDepths(selectedSkillDepths.filter(({ name }) => name !== value));
  };

  const validateInput = () => {
    return [
      {
        regexp: /[~!@#$%";'^,&*()_+|</>=>`?:{[\]}]/g,
        name: 'nickName',
        errorMessage: '사용 불가한 닉네임입니다.',
      },
      {
        regexp: /[1234567890]/g,
        name: 'company',
        errorMessage: '사용 불가한 직장명입니다.',
      },
    ];
  };

  useEffect(() => {
    if (dropdownValue.skillDepthThree === '' || !dropdownValue.skillDepthTwo) return;
    onClickDropdownSetting();
  }, [dropdownValue, onClickDropdownSetting]);

  return (
    <Container>
      <Header main spacerPosition="end">
        <Header.Item>
          <Back />
        </Header.Item>
        <Header.Item>
          <Text font="suit16sb" color="w1">
            프로필 설정
          </Text>
        </Header.Item>
      </Header>

      <MainWrapper>
        <div style={{ height: 20 }} />
        <MainBox>
          {/* <Default /> */}
          <ImageWrapper>
            <ImageBox>
              <Img src="https://image.toast.com/aaaaaqx/catchtable/shopinfo/sR1B6qa4fT537GjL6KO9bHg/r1b6qa4ft537gjl6ko9bhg_2371016411290157.jpg?detail750" />
            </ImageBox>
            <ImageWrite>
              <SVGLoginImageWrite />
            </ImageWrite>
          </ImageWrapper>

          <Field label="닉네임" value={fieldValue.nickName} maxLength={10} isRequired>
            <Field.Input
              name="nickName"
              onChange={onChangeField}
              onValidate={validateInput}
              placeholder="닉네임을 입력해주세요"
              errorMessage={fieldErrorValue.nickName}
              successMessage="사용 가능한 닉네임입니다."
            />
          </Field>

          <Spacer size={35} />
          <SettingWrapper>
            <Text required font="suit15m" color="b9">
              스킬 (최대 3개)
            </Text>
            <SettingBox>
              <Dropdown
                disabled={selectedSkillDepths.length === 3}
                selectedValue={dropdownValue.skillDepthOne}
                initialValue="대분류"
              >
                {MAIN_SKILL_QUERY.map(({ id, name }) => (
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
                  DETAIL_SKILL_QUERY[skillDepthOneId].map(({ id, name }) => (
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
                {SKILL_DEPTH_THREE_LIST.map(({ id, name }) => (
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
            <TagBox>
              {selectedSkillDepths.map((skill, idx) => {
                return <Tag key={idx} name={skill.name} onDelete={onDeleteSkill} />;
              })}
            </TagBox>
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
              {REGION_LIST.map(({ id, name }) => (
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

          <Field label="직장명" value={fieldValue.company} maxLength={10} isRequired>
            <Field.Input
              name="company"
              onChange={onChangeField}
              onValidate={validateInput}
              placeholder="직장명을 입력해주세요"
              errorMessage={fieldErrorValue.company}
              successMessage="사용 가능한 직장명입니다."
            />
          </Field>

          <Spacer size={35} />

          <Field label="자기소개" value={fieldValue.intro} maxLength={150} isRequired>
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
  padding-bottom: 45px;
`;

const MainWrapper = styled.div`
  background-color: ${theme.color.c1};
  height: 100%;
`;

const MainBox = styled.section`
  background-color: ${theme.color.w1};
  border-radius: 16px 16px 0 0;
  padding: 0 22px;
  margin-top: 107px;
  position: relative;
  padding-bottom: 40px;
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
  /* padding: 7px; */
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

export default Setting;
