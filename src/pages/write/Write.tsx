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
  SVGAdd24,
  SVGHeaderCheck24,
  SVGCancel,
  SVGRadioCheck24,
  SVGRadioUncheck24,
  Flex,
  useDropdown,
} from 'concept-be-design-system';
import { useState, ChangeEvent } from 'react';

import Back from '../../layouts/Back';
import {
  filterOptions,
  filterSubOptions,
  filterRadio,
  REGION_LIST,
  MAIN_SKILL_QUERY,
  DETAIL_SKILL_QUERY,
} from '../../modules/constants';
import { usePostIdeasMutation } from '../../hooks/mutations/useIdeasMutation';
import Header from './components/Header/Header';

const Write = () => {
  const { postIdeas } = usePostIdeasMutation();
  const [getIndex, setIndex] = useState('');
  const [getBody, setBody] = useState('');
  const [bodyCount, setBodyCount] = useState(0);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [getArea, setArea] = useState('');
  const [get1Depth, set1Depth] = useState(1);
  const [get2Depth, set2Depth] = useState<number[]>([]);
  const { checkboxValue, onChangeCheckbox } = useCheckbox({
    field: filterOptions,
    goal: filterSubOptions,
  });
  const { radioValue, onChangeRadio } = useRadio({
    collaboration: filterRadio,
  });
  const { dropdownValue, onClickDropdown } = useDropdown({
    region: '',
  });

  const writeIdea = () => {
    postIdeas({
      title: getIndex,
      introduce: getBody,
      recruitmentPlace: dropdownValue.region,
      cooperationWay: radioValue,
      branchIds: checkboxValue.field,
      purposeIds: checkboxValue.goal,
      teamRecruitmentIds: get2Depth,
    });
  };

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

  const onClick2Depth = (id: number) => {
    if (get2Depth.includes(id)) {
      set2Depth((prev2Depth) => prev2Depth.filter((item) => item !== id));
    } else {
      if (get2Depth.length >= 10) {
        alert('10개 이상 선택할 수 없습니다.');
      } else {
        set2Depth((prev2Depth) => [...prev2Depth, id]);
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
      <Header onClickCheckButton={writeIdea} />

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
          <CheckboxContainer
            label="분야"
            checkboxKey="field"
            options={checkboxValue.field}
            onChange={onChangeCheckbox}
          />
        </BottomBox>
        <BottomBox>
          <CheckboxContainer label="목적" checkboxKey="goal" options={checkboxValue.goal} onChange={onChangeCheckbox} />
        </BottomBox>
        <BottomBox>
          <RadioContainer
            label="협업방식"
            radioKey="collaboration"
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
              <Text font="suit13m" color="b9" style={{ lineHeight: '20px' }}>
                <Flex alignItems="center">
                  <SVGAdd24 />
                  팀원추가
                </Flex>
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

      {/* 추후 수정 필요 */}
      <BottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
        <Sheet_TopBox>
          <SVGCancel />
          <Text font="suit16sb" color="b4">
            팀원선택
          </Text>
          <SVGHeaderCheck24
            onClick={() => {
              setIsOpenBottomSheet(false);
            }}
          />
        </Sheet_TopBox>
        <Sheet_BodyBox>
          <Sheet_Left>
            {MAIN_SKILL_QUERY.map((skill) => {
              return (
                <Sheet_leftItem key={skill.id} onClick={() => set1Depth(skill.id)} checked={get1Depth === skill.id}>
                  <Text font="suit14m" color="ba">
                    {skill.name}
                  </Text>
                </Sheet_leftItem>
              );
            })}
          </Sheet_Left>
          <Sheet_right>
            {DETAIL_SKILL_QUERY[get1Depth].map((detailSkill) => {
              return (
                <Sheet_radioDiv key={detailSkill.id} onClick={() => onClick2Depth(detailSkill.id)}>
                  <Text font="suit14m" color="b4">
                    {detailSkill.name}
                  </Text>
                  {get2Depth.includes(detailSkill.id) ? <SVGRadioCheck24 /> : <SVGRadioUncheck24 />}
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
