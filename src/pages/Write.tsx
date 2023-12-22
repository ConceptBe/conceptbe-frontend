import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';

import plus from '../../src/assets/images/plus.png';
import { ReactComponent as RadioChecked } from '../assets/svg/active_check.svg';
import { ReactComponent as RadioUnChecked } from '../assets/svg/active_radio_uncheck.svg';
import { ReactComponent as Back } from '../assets/svg/back_24_B.svg';
import { ReactComponent as Check } from '../assets/svg/check_24.svg';
import { ReactComponent as UnCheck } from '../assets/svg/unCheck_24.svg';
import { ReactComponent as Xmark } from '../assets/svg/x.svg';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { checkboxOptions, getDomain } from '../components/BottomSheet/CheckBox';
import Divider from '../components/Divider';
import Checkbox from '../components/Inputs/Checkbox';
import Dropdown from '../components/Inputs/Dropdown/Dropdown';
import Radio, { radioOptions } from '../components/Inputs/Radio';
import Spacer from '../components/Spacer';
import Tag from '../components/Tag';
import Text from '../components/Text';
import {
  filterOptions,
  filterRadio,
  filterSubOptions,
  regionOptions,
  skillOneDepth,
  skillTwoDepth,
} from '../modules/constants';

const Write = () => {
  const theme = useTheme();
  const [getIndex, setIndex] = useState('');
  const [getBody, setBody] = useState('');
  const [bodyCount, setBodyCount] = useState(0);
  const [getDomain, setDomain] = useState<getDomain[] | []>(filterOptions);
  const [getpurpose, setpurpose] = useState<getDomain[] | []>(filterSubOptions);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [getArea, setArea] = useState('');
  const [getCollaboration, setCollaboration] = useState<string>('all');
  const [get1Depth, set1Depth] = useState('product');
  const [get2Depth, set2Depth] = useState([]);

  console.log(get2Depth, 'get2Depth');

  const handleIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) return;

    setIndex(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 2000) return;
    setBody(e.target.value);
    setBodyCount(e.target.value.length);
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
        <Text font={theme.typography.suit16sb} color={theme.colors.b4}>
          글쓰기
        </Text>
        <Check />
      </HeaderBox>

      <Divider color={theme.colors.l3} />
      {/* 제목인풋 */}

      <HeaderInput placeholder="제목을 입력해 주세요 (최대20자)" value={getIndex} onChange={handleIndexChange} />

      <Divider color={theme.colors.l3} />
      {/* 내용인풋 */}
      <div>
        <BodyTextarea placeholder="내용을 작성해주세요 (최대 2000자)" value={getBody} onChange={handleBodyChange} />

        <TextareaCountBox>
          <Text font={theme.typography.suit15m} color={theme.colors.c1}>
            {bodyCount}
          </Text>
          /2,000
        </TextareaCountBox>
      </div>
      <Divider color={theme.colors.bg1} height={8} bottom={30} />
      <BottomWrapper>
        <BottomBox>
          <Text font={theme.typography.suit15m} color={theme.colors.b9} required>
            분야
          </Text>

          <Spacer bottom={20} />
          <Checkbox options={getDomain} onChange={handleCheckboxChange} setState={setDomain} />
        </BottomBox>
        <BottomBox>
          <Text font={theme.typography.suit15m} color={theme.colors.b9} required>
            목적
          </Text>

          <Spacer bottom={20} />
          <Checkbox options={getpurpose} onChange={handleCheckboxChange} setState={setpurpose} />
        </BottomBox>
        <BottomBox>
          <Text font={theme.typography.suit15m} color={theme.colors.b9} required>
            협업방식
          </Text>

          <Spacer bottom={20} />
          <Radio defaultValue="all" options={filterRadio} onChange={(e) => setCollaboration(e)} gap={'large'} />
        </BottomBox>
        <BottomBox>
          <Text font={theme.typography.suit15m} color={theme.colors.b9}>
            모집 지역
          </Text>

          <Spacer bottom={20} />
          <Dropdown onClick={handleDropdownClick} items={regionOptions} initialValue={'전국'} value={getArea} />
        </BottomBox>
        <BottomBox>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text font={theme.typography.suit15m} color={theme.colors.b9}>
              팀원 모집
            </Text>
            <div
              onClick={() => {
                setIsOpenBottomSheet(true);
              }}
            >
              <Text font={theme.typography.suit13m} color={theme.colors.b9} style={{ lineHeight: '20px' }}>
                <img src={plus} /> 팀원추가
              </Text>
            </div>
          </div>

          <Spacer bottom={12} />
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

          <Spacer bottom={40} />
        </BottomBox>
      </BottomWrapper>

      <BottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
        <Sheet_TopBox>
          <Xmark />
          <Text font={theme.typography.suit16sb} color={theme.colors.b4}>
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
                    <Text font={theme.typography.suit14m} color={theme.colors.ba}>
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
                    <Text font={theme.typography.suit14m} color={theme.colors.b4}>
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
  color: ${(props) => props.theme.colors.b4};

  &:focus {
    ::placeholder {
      color: transparent;
    }
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.ba};
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
  color: ${(props) => props.theme.colors.b4};

  ::placeholder {
    color: ${(props) => props.theme.colors.ba};
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
  color: ${(props) => props.theme.colors.b9};
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

  background-color: ${(props) => (props.checked ? '' : props.theme.colors.bg1)};
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
  border: 1px solid ${({ theme }) => theme.colors.l2};
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.c1};
  color: ${(props) => props.theme.colors.w1};
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  gap: 14px;
`;
