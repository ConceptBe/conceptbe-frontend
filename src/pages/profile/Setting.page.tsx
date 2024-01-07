import styled from '@emotion/styled';
import {
  useCheckbox,
  useInput,
  Button,
  CheckboxContainer,
  Dropdown,
  Field,
  Header,
  Spacer,
  Tag,
  Text,
  theme,
  SVGImageWrite,
} from 'concept-be-design-system';
import { useCallback, useEffect, useState } from 'react';

import Back from '../../layouts/Back';
import { skillOneDepth, skillTwoDepth, regionOptions, filterSubOptions } from '../../modules/constants';

const dropdownItems = [
  { text: '숙련도', value: '', placeValue: true },
  { text: '상', value: '상' },
  { text: '중', value: '중' },
  { text: '하', value: '하' },
];

interface FormValueType {
  nickName: string;
  company: string;
  intro: string;
}

const Setting = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [oneDepth, setOneDepth] = useState(''); // 스킬(대분류)
  const [twoDepth, setTwoDepth] = useState(''); // 스킬(상세분류)
  const [threeDepth, setThreeDepth] = useState(''); // 스킬(숙련도)
  const [, setRegion] = useState(''); // 지역
  const { inputValue, inputErrorValue, onChangeInput } = useInput<FormValueType>({
    nickName: '',
    company: '',
    intro: '',
  });
  const { checkboxValue, onChangeCheckBox } = useCheckbox({
    goal: filterSubOptions,
  });
  const validDropDown = skills.length === 3;

  const handleDropdownClick = useCallback(() => {
    const joinValue = `${twoDepth}_${threeDepth}`;

    if (skills.length < 3) {
      setSkills([...skills, joinValue]);
      setOneDepth('');
      setTwoDepth('');
      setThreeDepth('');
    }
  }, [skills, threeDepth, twoDepth]);

  const handleDeleteSkill = (value: string) => {
    setSkills(skills.filter((skill) => skill !== value));
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
    if (threeDepth === '' || !twoDepth) return;
    handleDropdownClick();
  }, [threeDepth, handleDropdownClick, twoDepth]);

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
              <SVGImageWrite />
            </ImageWrite>
          </ImageWrapper>

          <Field label="닉네임" value={inputValue.nickName} maxLength={10} isRequired>
            <Field.Input
              name="nickName"
              value={inputValue.nickName}
              onChange={onChangeInput}
              onValidate={validateInput}
              maxLength={10}
              placeholder="닉네임을 입력해주세요"
              errorMessage={inputErrorValue.nickName}
              successMessage="사용 가능한 닉네임입니다."
              isRequired
            />
          </Field>

          <Spacer size={35} />
          <SettingWrapper>
            <Text required font="suit15m" color="b9">
              스킬 (최대 3개)
            </Text>
            <SettingBox>
              <Dropdown
                disabled={validDropDown}
                value={oneDepth}
                onClick={(value) => setOneDepth(value)}
                items={skillOneDepth}
                initialValue={'대분류'}
              />
              <Dropdown
                disabled={validDropDown}
                value={twoDepth}
                onClick={(value) => setTwoDepth(value)}
                items={skillTwoDepth[`${oneDepth}`] || []}
                initialValue={'상세분류'}
              />
              <Dropdown
                disabled={validDropDown}
                value={threeDepth}
                onClick={(value) => setThreeDepth(value)}
                items={dropdownItems}
                initialValue={'숙련도'}
              />
            </SettingBox>
            <TagBox>
              {skills.map((skill, idx) => {
                return <Tag key={idx} text={skill} onDelete={handleDeleteSkill} />;
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
              onChange={(e) => onChangeCheckBox(e, 'goal', { checkboxKey: 'goal', maxValue: 3 })}
            />
          </SettingWrapper>

          <Spacer size={35} />
          <SettingWrapper>
            <Text font="suit15m" color="b9">
              지역
            </Text>
            <Dropdown onClick={(value) => setRegion(value)} items={regionOptions} initialValue={'시/도/광역시'} />
          </SettingWrapper>

          <Spacer size={35} />

          <Field label="직장명" value={inputValue.company} maxLength={10} isRequired>
            <Field.Input
              name="company"
              value={inputValue.company}
              onChange={onChangeInput}
              onValidate={validateInput}
              maxLength={10}
              placeholder="직장명을 입력해주세요"
              errorMessage={inputErrorValue.company}
              successMessage="사용 가능한 직장명입니다."
              isRequired
            />
          </Field>

          <Spacer size={35} />

          <Field label="자기소개" value={inputValue.intro} maxLength={150} isRequired>
            <Field.Textarea
              name="intro"
              value={inputValue.intro}
              onChange={onChangeInput}
              onValidate={validateInput}
              maxLength={150}
              placeholder="자기소개를 입력해 주세요. (최대 150자)"
              errorMessage={inputErrorValue.intro}
              isRequired
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
