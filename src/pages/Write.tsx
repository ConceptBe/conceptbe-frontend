import styled from '@emotion/styled';
import {
  useCheckbox,
  useRadio,
  BottomSheet,
  CheckboxContainer,
  Divider,
  Dropdown,
  RadioContainer,
  Spacer,
  Text,
  theme,
  PNGPlus,
  SVGCheck24,
  SVGCancel,
  SVGActiveCheck,
  SVGActiveUncheckRadio,
} from 'concept-be-design-system';
import { useState, ChangeEvent } from 'react';

import Back from '../layouts/Back';
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

  return (
    <MainWrapper>
      {/* 헤더 */}
      <HeaderBox>
        <Back />
        <Text font="suit16sb" color="b4">
          글쓰기
        </Text>
        <SVGCheck24 />
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
          <CheckboxContainer
            nameKey="field"
            options={checkboxValue.field}
            onChange={(e) => onChangeCheckBox(e, 'field')}
          />
        </BottomBox>
        <BottomBox>
          <Text font="suit15m" color="b9" required>
            목적
          </Text>

          <Spacer size={20} />
          <CheckboxContainer
            nameKey="goal"
            options={checkboxValue.goal}
            onChange={(e) => onChangeCheckBox(e, 'goal')}
          />
        </BottomBox>
        <BottomBox>
          <Text font="suit15m" color="b9" required>
            협업방식
          </Text>

          <Spacer size={20} />
          <RadioContainer
            nameKey="collaboration"
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
          <Dropdown onClick={handleDropdownClick} items={regionOptions} initialValue="전국" value={getArea} />
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
                <img src={PNGPlus} /> 팀원추가
              </Text>
            </div>
          </div>

          <Spacer size={12} />
          <TeamLabelBox>
            {get2Depth.map((item) => {
              return (
                <TeamLabel>
                  {item}
                  <SVGCancel onClick={() => onClick2DepthDelete(item)} />
                </TeamLabel>
              );
            })}
          </TeamLabelBox>

          <Spacer size={40} />
        </BottomBox>
      </BottomWrapper>

      <BottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
        <Sheet_TopBox>
          <SVGCancel />
          <Text font="suit16sb" color="b4">
            팀원선택
          </Text>
          <SVGCheck24
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

                    {get2Depth.includes(e.value) ? <SVGActiveCheck /> : <SVGActiveUncheckRadio />}
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
  color: ${theme.color.b4};

  &:focus {
    ::placeholder {
      color: transparent;
    }
  }

  ::placeholder {
    color: ${theme.color.ba};
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
  color: ${theme.color.b4};

  ::placeholder {
    color: ${theme.color.ba};
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
  color: ${theme.color.b9};
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

  background-color: ${({ checked }) => (checked ? '' : theme.color.bg1)};
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
  border: 1px solid ${theme.color.l2};
  border-radius: 6px;
  background-color: ${theme.color.c1};
  color: ${theme.color.w1};
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
  gap: 14px;
`;
