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
  DotWrapper,
} from './Setting.style';
import { ReactComponent as Back } from '../../assets/svg/back_24_B.svg';
import { ReactComponent as Write } from '../../assets/svg/image_write.svg';
import useForm from '../../components/@common/@hooks/useForm';
import Button from '../../components/@common/Button/Button';
import InputContainer from '../../components/@common/InputContainer/InputContainer';
import Spacer from '../../components/@common/Spacer/Spacer';
import Text from '../../components/@common/Text/Text';
import Tag from '../../components/CustomTag/Tag';
import { Header } from '../../components/Header/Header';
import Checkbox, { checkboxOptions } from '../../components/Inputs/Checkbox';
import Dropdown from '../../components/Inputs/Dropdown/Dropdown';
import UnStyleButton from '../../components/UnStyleButton';
import { skillOneDepth, skillTwoDepth, filterSubOptions, regionOptions } from '../../modules/constants';

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
  const [purposeOptions, setPurposeOptions] = useState<checkboxOptions[] | []>([...filterSubOptions]); // 목적
  const [resion, setResion] = useState(''); // 지역
  const { formValue, errorValue, onChange } = useForm<FormValueType>({
    nickName: '',
    company: '',
    intro: '',
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

  const handleDeleteSkill = (value) => {
    setSkills(skills.filter((skill) => skill !== value));
  };

  const handleCheckboxChange = (
    value: string,
    newState: boolean,
    setState: React.Dispatch<React.SetStateAction<checkboxOptions[]>>,
  ) => {
    setState((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => (checkbox.value === value ? { ...checkbox, checked: !newState } : checkbox)),
    );
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
        errorMessage: '사용 불가한 닉네임입니다.',
      },
    ];
  };

  const validDropDown = skills.length === 3;

  return (
    <Container>
      <Header main emptyEnd>
        <Header.Item>
          <UnStyleButton style={{ color: theme.color.w1 }} onClick={() => navigate(-1)}>
            <Back />
          </UnStyleButton>
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

          <InputContainer
            label="닉네임"
            name="nickName"
            value={formValue.nickName}
            onChange={onChange}
            onValidate={validateInput}
            maxLength={10}
            placeholder="닉네임을 입력해주세요"
            errorMessage={errorValue.nickName}
            successMessage="사용 가능한 닉네임입니다."
            isLabelRequired
          />

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
            <Checkbox options={purposeOptions} setState={setPurposeOptions} onChange={handleCheckboxChange} />
          </SettingWrapper>

          <Spacer size={35} />
          <SettingWrapper>
            <Text font="suit15m" color="b9">
              지역
            </Text>
            <Dropdown onClick={(value) => setResion(value)} items={regionOptions} initialValue={'시/도/광역시'} />
          </SettingWrapper>

          <Spacer size={35} />

          <InputContainer
            label="직장명"
            name="company"
            value={formValue.company}
            onChange={onChange}
            onValidate={validateInput}
            placeholder="직장명을 입력해주세요"
            errorMessage={errorValue.company}
          />

          <Spacer size={35} />

          <InputContainer
            label="자기소개"
            name="intro"
            value={formValue.intro}
            onChange={onChange}
            onValidate={validateInput}
            maxLength={150}
            placeholder="닉네임을 입력해주세요"
            errorMessage={errorValue.intro}
          />
        </MainBox>
        <BottomWrapper>
          <Button onClick={() => {}}>프로필 저장하기</Button>
        </BottomWrapper>
      </MainWrapper>
    </Container>
  );
};

export default Setting;
