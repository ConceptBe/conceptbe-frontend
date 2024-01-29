import styled from '@emotion/styled';
import {
  useCheckbox,
  useRadio,
  BottomSheet,
  CheckboxContainer,
  Divider,
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
import { useState } from 'react';

import Header from './components/Header';
import RecruitmentPlaceSection from './components/RecruitmentPlaceSection';
import TitleAndIntroduceSection from './components/TitleAndIntroduceSection';
import { usePostIdeasMutation } from '../../hooks/mutations/useIdeasMutation';
import { useWritingInfoQuery } from '../../hooks/queries/useWritingInfoQuery';

const cooperationWays = [
  { id: 1, name: '상관없음' },
  { id: 2, name: '온라인' },
  { id: 3, name: '오프라인' },
];

const Write = () => {
  const { postIdeas } = usePostIdeasMutation();
  const { branches, purposes, recruitmentPlaces, teamRecruitments } = useWritingInfoQuery();

  const [title, setTitle] = useState('');
  const [introduce, setIntroduce] = useState('');

  const branchOptions = branches.map((properties) => ({ checked: false, ...properties }));
  const purposeOptions = purposes.map((properties) => ({ checked: false, ...properties }));
  const { checkboxValue, onChangeCheckbox } = useCheckbox({
    branches: branchOptions,
    purposes: purposeOptions,
  });

  const cooperationWayOptions = cooperationWays.map((properties) => {
    // 협업방식: 상관없음이 기본값(id === 1)
    return properties.id === 1 ? { checked: true, ...properties } : { checked: false, ...properties };
  });

  const { radioValue, onChangeRadio } = useRadio({
    cooperationWays: cooperationWayOptions,
  });

  // 모집 지역도 백엔드와 형식 논의해야할듯(id 추가..?)
  const { dropdownValue, onClickDropdown } = useDropdown({
    recruitmentPlace: '전국', // "전국"의 id === 1
  });

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const [selectedTeamRecruitment1Depth, setSelectedTeamRecruitment1Depth] = useState(teamRecruitments[0].name);
  const [selectedTeamRecruitments, setSelectedTeamRecruitments] = useState<{ id: number; name: string }[]>([]);

  const sheetLeftItems = teamRecruitments.map((item) => item.name);
  const sheetRightItems = teamRecruitments.find((item) => item.name === selectedTeamRecruitment1Depth)
    ?.teamRecruitmentResponses;

  const branchIds = checkboxValue.branches.filter((branch) => branch.checked).map((branch) => branch.id);
  const purposeIds = checkboxValue.purposes.filter((branch) => branch.checked).map((purpose) => purpose.id);
  const cooperationWay = radioValue.cooperationWays.find((cooperationWay) => cooperationWay.checked)?.name;
  const canSubmit = branchIds.length > 0 && purposeIds.length > 0 && !!cooperationWay;

  if (!sheetRightItems) {
    console.error('sheetRightItems is null');
    return null;
  }

  const writeIdea = () => {
    const recruitmentPlaceId = recruitmentPlaces.find((place) => place.name === dropdownValue.recruitmentPlace)?.id;
    const teamRecruitmentIds = selectedTeamRecruitments.map((teamRecruitment) => teamRecruitment.id);

    // TODO: 글쓰기 필수 조건 누락 시 토스트 띄워주기 (alert -> toast)
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!introduce) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (!branchIds.length) {
      alert('분야를 1개 이상 선택해주세요.');
      return;
    }
    if (!purposeIds.length) {
      alert('목적을 1개 이상 선택해주세요.');
      return;
    }
    if (!cooperationWay) {
      alert('협업방식을 선택해주세요.');
      return;
    }
    if (!recruitmentPlaceId) {
      alert('모집지역을 선택해주세요.');
      return;
    }

    postIdeas({
      title,
      introduce,
      recruitmentPlace: recruitmentPlaceId,
      cooperationWay,
      branchIds,
      purposeIds,
      teamRecruitmentIds,
    });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleIntroduceChange = (newIntroduce: string) => {
    setIntroduce(newIntroduce);
  };

  const onClickTeamRecruitment = (selected: { id: number; name: string }) => {
    if (setSelectedTeamRecruitments.length >= 10) {
      alert('10개 이상 선택할 수 없습니다.');
      return;
    }
    setSelectedTeamRecruitments((prev) =>
      selectedTeamRecruitments.includes(selected)
        ? prev.filter((item) => item.id !== selected.id)
        : [...prev, selected],
    );
  };

  const onDeleteTeamRecruitment = (id: number) => {
    setSelectedTeamRecruitments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MainWrapper>
      <Header onClickCheckButton={writeIdea} isCheckButtonEnabled={canSubmit} />

      <Divider color="l3" />
      <TitleAndIntroduceSection
        title={title}
        introduce={introduce}
        onTitleChange={handleTitleChange}
        onIntroduceChange={handleIntroduceChange}
      />

      <Divider color="bg1" height={8} bottom={30} />
      <BottomWrapper>
        <BottomBox>
          <CheckboxContainer
            label="분야"
            checkboxKey="branches"
            options={checkboxValue.branches}
            onChange={onChangeCheckbox}
          />
        </BottomBox>
        <BottomBox>
          <CheckboxContainer
            label="목적"
            checkboxKey="purposes"
            options={checkboxValue.purposes}
            onChange={onChangeCheckbox}
          />
        </BottomBox>
        <BottomBox>
          <RadioContainer
            label="협업방식"
            radioKey="cooperationWays"
            options={radioValue.cooperationWays}
            onChange={(e) => onChangeRadio(e, 'cooperationWays')}
            gap="large"
          />
        </BottomBox>
        <BottomBox>
          <RecruitmentPlaceSection
            places={recruitmentPlaces}
            selectedPlace={dropdownValue.recruitmentPlace}
            onPlaceChange={(selectedPlace) => onClickDropdown(selectedPlace, 'recruitmentPlace')}
          />
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
            {selectedTeamRecruitments.map((item) => {
              return (
                <TeamLabel>
                  {item.name}
                  <SVGCancel onClick={() => onDeleteTeamRecruitment(item.id)} />
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
            {sheetLeftItems.map((item) => {
              return (
                <Sheet_leftItem
                  key={item}
                  onClick={() => setSelectedTeamRecruitment1Depth(item)}
                  checked={selectedTeamRecruitment1Depth === item}
                >
                  <Text font="suit14m" color="ba">
                    {item}
                  </Text>
                </Sheet_leftItem>
              );
            })}
          </Sheet_Left>
          <Sheet_right>
            {sheetRightItems.map((item) => {
              return (
                <Sheet_radioDiv key={item.name} onClick={() => onClickTeamRecruitment(item)}>
                  <Text font="suit14m" color="b4">
                    {item.name}
                  </Text>
                  {/* 조건문 다시 고려 */}
                  {selectedTeamRecruitments.includes(item) ? <SVGRadioCheck24 /> : <SVGRadioUncheck24 />}
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
