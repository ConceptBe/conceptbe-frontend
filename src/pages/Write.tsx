import styled from '@emotion/styled';
import axios from 'axios';
import { useState, ChangeEvent } from 'react';

import plus from '../../src/assets/images/plus.png';
import { ReactComponent as RadioChecked } from '../assets/svg/active_check.svg';
import { ReactComponent as RadioUnChecked } from '../assets/svg/active_radio_uncheck.svg';
import { ReactComponent as Back } from '../assets/svg/back_24_B.svg';
import { ReactComponent as Check } from '../assets/svg/check_24.svg';
import { ReactComponent as Xmark } from '../assets/svg/x.svg';
import useCheckbox from '../components/@common/@hooks/useCheckbox';
import useRadio from '../components/@common/@hooks/useRadio';
import CheckboxContainer from '../components/@common/CheckboxContainer/CheckboxContainer';
import Divider from '../components/@common/Divider/Divider';
import RadioContainer from '../components/@common/RadioContainer/RadioContainer';
import Spacer from '../components/@common/Spacer/Spacer';
import Text from '../components/@common/Text/Text';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import Dropdown from '../components/Inputs/Dropdown/Dropdown';
import Tag from '../components/Tag';
import {
  filterOptions,
  filterSubOptions,
  filterRadio,
  regionOptions,
  skillOneDepth,
  skillTwoDepth,
} from '../modules/constants';

const Write = () => {
  const [getIndex, setIndex] = useState('');
  const [getBody, setBody] = useState('');
  const [bodyCount, setBodyCount] = useState(0);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [getArea, setArea] = useState('');
  const [get1Depth, set1Depth] = useState('product');
  const [get2Depth, set2Depth] = useState([]);
  const { checkboxValue, onChangeCheckBox } = useCheckbox({
    field: filterOptions,
    goal: filterSubOptions,
  });
  const { radioValue, onChangeRadio } = useRadio({
    collaboration: filterRadio,
  });

  const handleIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) return;

    setIndex(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 2000) return;
    setBody(e.target.value);
    setBodyCount(e.target.value.length);
  };

  const handleDropdownClick = (value: string) => {
    setArea(value);
  };

  const onClick2Depth = (value: never) => {
    if (get2Depth.includes(value)) {
      set2Depth((prev2Depth) => prev2Depth.filter((item) => item !== value));
    } else {
      if (get2Depth.length >= 10) {
        alert('10개 이상 선택할 수 없습니다.');
      } else {
        set2Depth((prev2Depth) => [...prev2Depth, value]);
      }
    }
  };

  const onClick2DepthDelete = (e: never) => {
    if (get2Depth.indexOf(e) !== -1) {
      set2Depth(
        get2Depth.filter((item) => {
          return item !== e;
        }),
      );
    }
  };

  const options = {
    method: 'POST',
    url: 'http://15.164.242.20/api/posts',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer 123',
    },
    data: {
      title: 'string',
      content: 'string',
      domain: 'IT',
      purpose: '사이드프로젝트',
      collaboration: '상관없음',
      area: '서울특별시',
      members: ['string'],
    },
  };

  const aaa = async () => {
    console.log('ddfㅁㄴㅇㄹㅇㅇ');

    const { data } = await axios.request(options);
    console.log(data, 'dㅁㄴㅇㄹd');

    try {
      const { data } = await axios.request(options);
      console.log(data, 'data');
    } catch (error) {
      console.error(error, 'error');
    }
  };

  return (
    <MainWrapper>
      {/* <div onClick={aaa}>ddd</div> */}
      {/* 헤더 */}
      <HeaderBox>
        <Back />
        <button onClick={() => aaa()}></button>
        <Text font="suit16sb" color="b4">
          글쓰기
        </Text>
        <Check />
      </HeaderBox>

      <Divider color="l3" />
      {/* 제목인풋 */}

      <HeaderInput placeholder="제목을 입력해 주세요 (최대20자)" value={getIndex} onChange={handleIndexChange} />

      <Divider color="l3" />
      {/* 내용인풋 */}
      <div>
        <BodyTextarea placeholder="내용을 작성해주세요 (최대 2000자)" value={getBody} onChange={handleBodyChange} />

        <TextareaCountBox>
          <Text font="suit15m" color="c1">
            {bodyCount}
          </Text>
          /2,000
        </TextareaCountBox>
      </div>
      <Divider color="bg1" height={8} bottom={30} />
      <BottomWrapper>
        <BottomBox>
          <Text font="suit15m" color="b9" required>
            분야
          </Text>

          <Spacer size={20} />
          <CheckboxContainer options={checkboxValue.field} onChange={(e) => onChangeCheckBox(e, 'field')} />
        </BottomBox>
        <BottomBox>
          <Text font="suit15m" color="b9" required>
            목적
          </Text>

          <Spacer size={20} />
          <CheckboxContainer options={checkboxValue.goal} onChange={(e) => onChangeCheckBox(e, 'goal')} />
        </BottomBox>
        <BottomBox>
          <Text font="suit15m" color="b9" required>
            협업방식
          </Text>

          <Spacer size={20} />
          <RadioContainer
            options={radioValue.collaboration}
            onChange={(e) => onChangeRadio(e, 'collaboration')}
            gap="large"
          />
        </BottomBox>
        <BottomBox>
          <Text font="suit15m" color="b9">
            모집 지역
          </Text>

          <Spacer size={20} />
          <Dropdown onClick={handleDropdownClick} items={regionOptions} initialValue={'전국'} value={getArea} />
        </BottomBox>
        <BottomBox>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text font="suit15m" color="b9">
              팀원 모집
            </Text>
            <div
              onClick={() => {
                setIsOpenBottomSheet(true);
              }}
            >
              <Text font="suit13m" color="b9" customStyle={{ lineHeight: '20px' }}>
                <img src={plus} /> 팀원추가
              </Text>
            </div>
          </div>

          <Spacer size={12} />
          <TeamLabelBox>
            {get2Depth.map((item) => {
              return (
                <TeamLabel>
                  {item}
                  <Xmark onClick={() => onClick2DepthDelete(item)} />
                </TeamLabel>
              );
            })}
          </TeamLabelBox>

          <Spacer size={40} />
        </BottomBox>
      </BottomWrapper>

      <BottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
        <Sheet_TopBox>
          <Xmark />
          <Text font="suit16sb" color="b4">
            팀원선택
          </Text>
          <Check
            onClick={() => {
              setIsOpenBottomSheet(false);
            }}
          />
        </Sheet_TopBox>
        <Sheet_BodyBox>
          <Sheet_Left>
            {skillOneDepth
              .filter((e) => {
                return e.text !== '대분류';
              })
              .map((e, index) => {
                return (
                  <Sheet_leftItem key={index} onClick={() => set1Depth(e.value)} checked={get1Depth === e.value}>
                    <Text font="suit14m" color="ba">
                      {e.text}
                    </Text>
                  </Sheet_leftItem>
                );
              })}
          </Sheet_Left>
          <Sheet_right>
            {skillTwoDepth[get1Depth]
              .filter((e: { text: string }) => {
                return e.text !== '상세분류';
              })
              .map((e: { text: string; checked: boolean; value: never }, index: string) => {
                return (
                  <Sheet_radioDiv key={index} onClick={() => onClick2Depth(e.value)}>
                    <Text font="suit14m" color="b4">
                      {e.text}
                    </Text>

                    {get2Depth.includes(e.value) ? <RadioChecked /> : <RadioUnChecked />}
                  </Sheet_radioDiv>
                );
              })}
          </Sheet_right>
        </Sheet_BodyBox>
      </BottomSheet>
    </MainWrapper>
  );
};

export default Write;

const MainWrapper = styled.div`
  width: 100%;
`;

const HeaderBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  padding: 0 22px;
`;

const HeaderInput = styled.input`
  width: 100%;

  border: none;
  padding: 20px;
  outline: none;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.color.b4};

  &:focus {
    ::placeholder {
      color: transparent;
    }
  }

  ::placeholder {
    color: ${(props) => props.theme.color.ba};
  }
`;

const BodyTextarea = styled.textarea`
  width: 100%;
  overflow: auto;
  height: 190px;
  border: none;
  padding: 20px 22px 25px 22px;
  outline: none;
  font-size: 15px;
  font-weight: 400;
  resize: none;
  color: ${(props) => props.theme.color.b4};

  ::placeholder {
    color: ${(props) => props.theme.color.ba};
  }
  &:focus {
    ::placeholder {
      color: transparent;
    }
  }
`;

const TextareaCountBox = styled.div`
  display: flex;
  justify-content: end;
  padding: 0px 22px 25px 22px;
  color: ${(props) => props.theme.color.b9};
  font-size: 15px;
  font-weight: 500;
`;

const BottomWrapper = styled.div`
  padding: 0px 22px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const BottomBox = styled.div``;

const Sheet_TopBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  padding: 0 22px;
`;
const Sheet_BodyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Sheet_Left = styled.div`
  width: 38%;
`;

const Sheet_leftItem = styled.div<{ checked: boolean }>`
  padding: 10px 22px;

  background-color: ${(props) => (props.checked ? '' : props.theme.color.bg1)};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  height: 34px;
`;
const Sheet_right = styled.div`
  width: 62%;
  box-sizing: border-box;
  padding: 0 22px;
`;

const Sheet_radioDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 54px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TeamLabelBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TeamLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 16px 12px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.l2};
  border-radius: 6px;
  background-color: ${(props) => props.theme.color.c1};
  color: ${(props) => props.theme.color.w1};
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  gap: 14px;
`;
