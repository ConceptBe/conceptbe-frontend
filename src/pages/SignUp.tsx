import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

import { ReactComponent as Check } from '../assets/svg/check_24.svg';
import { ReactComponent as Close } from '../assets/svg/close_24.svg';
import useForm from '../components/@common/@hooks/useForm.ts';
import Button from '../components/@common/Button/Button.tsx';
import InputContainer from '../components/@common/InputContainer/InputContainer.tsx';
import Text from '../components/@common/Text/Text.tsx';
import BottomSheet from '../components/BottomSheet/BottomSheet.tsx';
import CheckBoxModal from '../components/BottomSheet/CheckBox.tsx';
import IdeaCard from '../components/Card/IdeaCard.tsx';
import PopCard from '../components/Card/PopCard.tsx';
import Checkbox, { checkboxOptions } from '../components/Inputs/Checkbox.tsx';
import Dropdown from '../components/Inputs/Dropdown/Dropdown.tsx';
import Radio, { radioOptions } from '../components/Inputs/Radio.tsx';
// svg
import { memberSelect, memberSelectDetails } from '../modules/constants.tsx';

interface FormValueType {
  a: string;
  b: string;
}

const SignUp = () => {
  const theme = useTheme();
  const { formValue, errorValue, onChange } = useForm<FormValueType>({
    a: '',
    b: '',
  });

  //라디오
  const [selectedRadio, setSelectedRadio] = useState<string>('');
  const handleOptionChange = (value: string) => {
    setSelectedRadio(value);
  };

  const [radioOptions, setRadioOptions] = useState<radioOptions[] | []>([]);

  useEffect(() => {
    setRadioOptions([
      { text: '옵션 1', value: 'option1' },
      { text: '옵션 2', value: 'option2' },
      { text: '옵션 3', value: 'option3' },
    ]);
  }, []);

  //체크박스
  const [checkboxOptions, setCheckboxOptions] = useState<checkboxOptions[] | []>([]);

  const handleCheckboxChange = (value: string, newState: boolean) => {
    setCheckboxOptions((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => (checkbox.value === value ? { ...checkbox, checked: !newState } : checkbox)),
    );
  };

  useEffect(() => {
    setCheckboxOptions([
      { text: '체크 1', value: 'check1', checked: false },
      { text: '체크 2', value: 'check2', checked: false },
      { text: '체크 3', value: 'check3', checked: false },
    ]);
  }, []);

  //버튼
  const buttonClick = () => {
    console.log('button');
  };

  // 아이디어
  const ideas = [
    { id: 1, title: '제목입니다. 제목입니다. 제목입니다.', category: 'IT' },
    { id: 2, title: '제목입니다. 제목입니다. 제목입니다.', category: '디자인' },
    { id: 3, title: '제목입니다. 제목입니다. 제목입니다.', category: '기획' },
    { id: 3, title: '제목입니다. 제목입니다. 제목입니다.', category: '기획' },
    { id: 3, title: '제목입니다. 제목입니다. 제목입니다.', category: '기획' },
    { id: 3, title: '제목입니다. 제목입니다. 제목입니다.', category: '기획' },
  ];

  //태그
  const tags = ['팀원모집', '팀원모집', '팀원모집', '팀원모집'];

  //인풋 라벨
  const [inputText, setInputText] = useState('');
  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  //드롭다운
  const dropdownItems = [
    { value: '1', text: 'Dropdown item1 asdasddas' },
    { value: '2', text: 'Dropdown item2' },
  ];

  const handleDropdownClick = (value: string) => {
    console.log(value);
  };

  // 필터 bottom sheet
  const [isOpen, setIsOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  // 팀원 추가 bottom sheet
  const [isModal, setIsModal] = useState(false);

  const toggleAddMember = () => {
    setIsModal(!isModal);
  };

  // 모달 체크박스
  const [selectMain, setSelectMain] = useState({ text: '기획', value: '기획' });
  const [modalCheckboxOptions, setModalCheckboxOptions] = useState<checkboxOptions[] | []>([]);

  const handleModalCheckboxChange = (value: string, newState: boolean) => {
    setModalCheckboxOptions((prevCheckboxes) =>
      prevCheckboxes.map(
        (checkbox) =>
          checkbox.parent === selectMain.text && {
            ...checkbox,
            options: checkbox.options.map((option) =>
              option.value === value ? { ...option, checked: !newState } : option,
            ),
          },
      ),
    );
  };

  const validateInput = () => {
    return [
      {
        regexp: /[~!@#$%";'^,&*()_+|</>=>`?:{[\]}]/g,
        name: 'a',
        errorMessage: '사용 불가한 닉네임입니다.',
      },
    ];
  };

  useEffect(() => {
    setModalCheckboxOptions(memberSelectDetails.filter((detail) => detail.parent === selectMain.value));
  }, [selectMain]);

  console.log('selectMain', selectMain);
  console.log('modalCheckboxOptions', modalCheckboxOptions[0]?.options);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <Radio options={radioOptions} onChange={handleOptionChange} gap={'large'} />
        <p>선택한 옵션: {selectedRadio}</p>
      </div>

      <div>
        <Checkbox options={checkboxOptions} onChange={handleCheckboxChange} />
        <p>선택한 옵션!: {checkboxOptions.map(({ text, checked }) => checked && text + ' ')}</p>
      </div>

      <div>
        <Button onClick={toggleBottomSheet}>필터</Button>
        <Button onClick={toggleAddMember}>팀원추가</Button>
        <Button onClick={buttonClick} isGrayOut>
          버튼
        </Button>
      </div>

      <div>
        <InputContainer
          label="임시 A"
          name="a"
          value={formValue.a}
          onChange={onChange}
          onValidate={validateInput}
          maxLength={10}
          placeholder="닉네임을 입력해주세요"
          errorMessage={errorValue.a}
          successMessage="사용 가능한 닉네임입니다."
          isLabelRequired
        />
        <InputContainer
          label="임시 B"
          name="b"
          value={formValue.b}
          onChange={onChange}
          onValidate={validateInput}
          maxLength={20}
          placeholder="닉네임을 입력해주세요"
          errorMessage={errorValue.b}
          successMessage="사용 가능한 닉네임입니다."
          isLabelRequired
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue={'다운'} />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: 10,
          overflowX: 'scroll',
          overflowY: 'hidden',
          paddingLeft: 22,
          paddingRight: 22,
        }}
      >
        {ideas.map((idea, idx) => {
          return <PopCard key={idx} category={idea.category} title={idea.title} />;
        })}
      </div>

      <div style={{ padding: 20 }}>
        {Array.from({ length: 20 }, (_, idx) => (
          <IdeaCard key={idx} tags={tags} />
        ))}
      </div>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: 20,
          }}
        >
          <div>콘텐츠부분!</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, marginBottom: 50 }}>
            <Button customStyle={{ flex: 1 }} onClick={toggleBottomSheet} isGrayOut>
              닫기
            </Button>
            <Button customStyle={{ flex: 2 }} onClick={buttonClick}>
              적용
            </Button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={isModal} onClose={() => setIsModal(false)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 22 }}>
          <Close onClick={() => setIsModal(false)} />
          <Text font="suit16sb">타이틀</Text>
          <Check />
        </div>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 1 }}>
            {memberSelect.map((select) => {
              return (
                <div
                  style={{
                    padding: '18px 22px',
                    color: selectMain.text === select.text ? theme.color.b2 : theme.color.ba,
                    background: selectMain.text === select.text ? theme.color.w1 : theme.color.bg1,
                  }}
                  onClick={() => setSelectMain(select)}
                >
                  <Text font="suit14m">{select.text}</Text>
                </div>
              );
            })}
          </div>
          <div style={{ flex: 2 }}>
            <CheckBoxModal options={modalCheckboxOptions[0]?.options} onChange={handleModalCheckboxChange} />
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default SignUp;
