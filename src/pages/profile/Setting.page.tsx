import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  ImageWrapper,
  ImageBox,
  Img,
  ImageWrite,
  SettingBox,
  TagBox,
  SettingWrapper,
  MainBox,
  MainWrapper,
  BottomWrapper,
} from './Setting.style';
import { ReactComponent as Back } from '../../assets/svg/back_24_B.svg';
import { ReactComponent as Write } from '../../assets/svg/image_write.svg';
import useCheckbox from '../../components/@common/@hooks/useCheckbox';
import useInput from '../../components/@common/@hooks/useInput';
import Button from '../../components/@common/Button/Button';
import CheckboxContainer from '../../components/@common/CheckboxContainer/CheckboxContainer';
import Field from '../../components/@common/Field/Field';
import Header from '../../components/@common/Header/Header';
import Spacer from '../../components/@common/Spacer/Spacer';
import Tag from '../../components/@common/Tag/Tag';
import Text from '../../components/@common/Text/Text';
import Dropdown from '../../components/Inputs/Dropdown/Dropdown';
import { skillOneDepth, skillTwoDepth, regionOptions, filterSubOptions } from '../../modules/constants';

const dropdownItems = [
  { text: '숙련도', value: '', defaultValue: true },
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
  const theme = useTheme();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [oneDepth, setOneDepth] = useState(''); // 스킬(대분류)
  const [twoDepth, setTwoDepth] = useState(''); // 스킬(상세분류)
  const [threeDepth, setThreeDepth] = useState(''); // 스킬(숙련도)
  const [resion, setResion] = useState(''); // 지역
  const { inputValue, inputErrorValue, onChangeInput } = useInput<FormValueType>({
    nickName: '',
    company: '',
    intro: '',
  });
  const { checkboxValue, onChangeCheckBox } = useCheckbox({
    goal: filterSubOptions,
  });

  const handleDropdownClick = (value: string) => {
    const joinValue = `${twoDepth}_${value}`;
    if (skills.length < 3) {
      setSkills([...skills, joinValue]);
      setOneDepth('');
      setTwoDepth('');
      setThreeDepth('');
    }
  };

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

  const validDropDown = skills.length === 3;

  return (
    <Container>
      <Header main spacerPosition="end">
        <Header.Item>
          <Back style={{ color: theme.color.w1 }} onClick={() => navigate(-1)} cursor="pointer" />
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
              <Write />
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
                onClick={handleDropdownClick}
                items={dropdownItems}
                initialValue={'숙련도'}
              />
            </SettingBox>
            <TagBox>
              {skills.map((skill) => {
                return <Tag text={skill} onDelete={handleDeleteSkill} />;
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
            <Dropdown onClick={(value) => setResion(value)} items={regionOptions} initialValue={'시/도/광역시'} />
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

export default Setting;
