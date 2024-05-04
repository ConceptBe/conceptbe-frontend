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
  Box,
} from 'concept-be-design-system';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import RecruitmentPlaceSection from './components/RecruitmentPlaceSection';
import TitleAndIntroduceSection from './components/TitleAndIntroduceSection';
import { usePutIdea } from './hooks/mutations/usePutIdea';
import { useWritingEditInfoQuery } from './hooks/queries/useWritingInfoQuery';
import { Info } from './types';
import { get2DepthCountsBy1Depth } from './utils/get2DepthCountsBy1Depth';
import useAlert from '../../hooks/useAlert';

const WriteEditPage = () => {
  const openAlert = useAlert();
  const location = useLocation();
  const { putIdea } = usePutIdea();

  const { ideaDetail, branches, purposes, recruitmentPlaces, cooperationWays, skillCategoryResponses } =
    useWritingEditInfoQuery(Number(location.state.ideaId));

  const [title, setTitle] = useState(ideaDetail.title);
  const [introduce, setIntroduce] = useState(ideaDetail.introduce);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [selectedTeamRecruitment1Depth, setSelectedTeamRecruitment1Depth] = useState(skillCategoryResponses[0].name);
  const [selectedSkillResponses, setSelectedSkillResponses] = useState<Info[]>(
    skillCategoryResponses
      .map((item) => item.skillResponses)
      .flat()
      .filter((item) => ideaDetail.skillCategories.includes(item.name)),
  );

  const { checkboxValue, selectedCheckboxId, onChangeCheckbox } = useCheckbox({
    branches,
    purposes,
  });
  const { radioValue, selectedRadioName, onChangeRadio } = useRadio({
    cooperationWays,
  });
  const { dropdownValue, onClickDropdown } = useDropdown({
    recruitmentPlace: ideaDetail.recruitmentPlace,
  });

  const sheetLeftItems = skillCategoryResponses.map((item) => item.name);
  const sheetRightItems = skillCategoryResponses.find((item) => item.name === selectedTeamRecruitment1Depth)
    ?.skillResponses;

  const canSubmit =
    selectedCheckboxId.branches.length > 0 &&
    selectedCheckboxId.purposes.length > 0 &&
    !!selectedRadioName.cooperationWays;

  if (!sheetRightItems) {
    console.error('sheetRightItems is null');
    return null;
  }

  const writeIdea = () => {
    // TODO: 글쓰기 필수 조건 누락 시 토스트 띄워주기 (alert -> toast)
    if (!title) {
      openAlert({ content: '제목을 입력해 주세요.' });
      return;
    }
    if (introduce.length < 10) {
      openAlert({ content: '본문 내용을 10자 이상 입력해 주세요.' });
      return;
    }
    if (!selectedCheckboxId.branches.length) {
      openAlert({ content: '분야를 1개 이상 선택해 주세요.' });
      return;
    }
    if (!selectedCheckboxId.purposes.length) {
      openAlert({ content: '목적을 1개 이상 선택해 주세요.' });
      return;
    }
    if (!selectedRadioName.cooperationWays) {
      openAlert({ content: '협업방식을 선택해 주세요.' });
      return;
    }

    putIdea({
      ideaId: Number(location.state.ideaId),
      idea: {
        title,
        introduce,
        recruitmentPlaceId: recruitmentPlaces.find((place) => place.name === dropdownValue.recruitmentPlace)?.id || 1,
        cooperationWay: selectedRadioName.cooperationWays,
        branchIds: selectedCheckboxId.branches,
        purposeIds: selectedCheckboxId.purposes,
        skillCategoryIds: selectedSkillResponses.map((selectedSkillResponse) => selectedSkillResponse.id),
      },
    });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleIntroduceChange = (newIntroduce: string) => {
    setIntroduce(newIntroduce);
  };

  const onClickTeamRecruitment = (selected: Info) => {
    if (selectedSkillResponses.length >= 10) {
      openAlert({ content: '최대 10개까지 선택할 수 있습니다.' });
      return;
    }
    setSelectedSkillResponses((prev) =>
      selectedSkillResponses.includes(selected) ? prev.filter((item) => item.id !== selected.id) : [...prev, selected],
    );
  };

  const onDeleteTeamRecruitment = (id: number) => {
    setSelectedSkillResponses((prev) => prev.filter((item) => item.id !== id));
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
        <Box>
          <CheckboxContainer
            label="분야"
            checkboxKey="branches"
            options={checkboxValue.branches}
            onChange={onChangeCheckbox}
            required
          />
        </Box>
        <Box>
          <CheckboxContainer
            label="목적"
            checkboxKey="purposes"
            options={checkboxValue.purposes}
            onChange={onChangeCheckbox}
            required
          />
        </Box>
        <Box>
          <RadioContainer
            label="협업방식"
            radioKey="cooperationWays"
            options={radioValue.cooperationWays}
            onChange={(e) => onChangeRadio(e, 'cooperationWays')}
            gap="large"
            required
          />
        </Box>
        <Box>
          <RecruitmentPlaceSection
            places={recruitmentPlaces}
            selectedPlace={dropdownValue.recruitmentPlace}
            onPlaceChange={(selectedPlace) => onClickDropdown(selectedPlace, 'recruitmentPlace')}
          />
        </Box>

        <Box height={144}>
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
                <Flex alignItems="center" cursor="pointer">
                  <SVGAdd24 />
                  <Spacer size={6} />
                  팀원 추가
                </Flex>
              </Text>
            </div>
          </div>

          <Spacer size={12} />
          <TeamLabelBox>
            {selectedSkillResponses.map((item) => {
              return (
                <TeamLabel key={item.id}>
                  {item.name}
                  <SVGCancel onClick={() => onDeleteTeamRecruitment(item.id)} cursor="pointer" />
                </TeamLabel>
              );
            })}
          </TeamLabelBox>

          <Spacer size={40} />
        </Box>
      </BottomWrapper>

      <BottomSheet isOpen={isOpenBottomSheet} onClose={() => setIsOpenBottomSheet(false)}>
        <Sheet_TopBox>
          <SVGCancel
            width={24}
            height={24}
            onClick={() => {
              setIsOpenBottomSheet(false);
            }}
            cursor="pointer"
          />
          <Text font="suit16sb" color="b4">
            팀원 선택
          </Text>
          <SVGHeaderCheck24
            onClick={() => {
              setIsOpenBottomSheet(false);
            }}
            cursor="pointer"
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
                  <Text font="suit14m" color={selectedTeamRecruitment1Depth === item ? 'b2' : 'ba'}>
                    {item}
                  </Text>
                  <Spacer size={3} />
                  <Text font="suit14m" color={selectedTeamRecruitment1Depth === item ? 'c1' : 'ba'}>
                    {get2DepthCountsBy1Depth(selectedSkillResponses, skillCategoryResponses)[item]}
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
                  {selectedSkillResponses.includes(item) ? <SVGRadioCheck24 /> : <SVGRadioUncheck24 />}
                </Sheet_radioDiv>
              );
            })}
          </Sheet_right>
        </Sheet_BodyBox>
      </BottomSheet>
    </MainWrapper>
  );
};

export default WriteEditPage;

const MainWrapper = styled.div`
  width: 100%;
`;

const BottomWrapper = styled.div`
  padding: 0px 22px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

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
  cursor: pointer;
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
  cursor: pointer;
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
