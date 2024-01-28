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
import { filterRadio, REGION_LIST, MAIN_SKILL_QUERY, DETAIL_SKILL_QUERY } from '../../modules/constants';
import { usePostIdeasMutation } from '../../hooks/mutations/useIdeasMutation';
import Header from './components/Header';
import TitleAndIntroduceSection from './components/TitleAndIntroduceSection';
import BranchSection from './components/BranchSection';
import RecruitmentPlaceSection from './components/RecruitmentPlaceSection';

// 목데이터: 추후 쿼리로 받아오기
// 분야 필터
const branches = [
  { name: 'IT', id: 1 },
  { name: '게임', id: 2 },
  { name: '제품', id: 3 },
  { name: '유튜브컨텐츠', id: 4 },
  { name: '영화', id: 5 },
  { name: '웹툰', id: 6 },
];

// 목적 필터
const purposes = [
  { id: 1, name: '사이드프로젝트' },
  { id: 2, name: '창업' },
  { id: 3, name: '크라우드펀딩' },
  { id: 4, name: '공모전' },
  { id: 5, name: '스터디' },
];

// 협업 방식 필터
const cooperationWays = [
  { name: '상관없음', id: 1 },
  { name: '온라인', id: 2 },
  { name: '오프라인', id: 3 },
];

// 지역 목록
const places = [
  { id: 1, name: '서울특별시' },
  { id: 2, name: '부산광역시' },
  { id: 3, name: '대구광역시' },
  { id: 4, name: '인천광역시' },
  { id: 5, name: '광주광역시' },
  { id: 6, name: '울산광역시' },
  { id: 7, name: '세종특별자치시' },
  { id: 8, name: '경기도' },
  { id: 9, name: '강원특별자치도' },
  { id: 10, name: '충청북도' },
  { id: 11, name: '충청남도' },
  { id: 12, name: '전라북도' },
  { id: 13, name: '전라남도' },
  { id: 14, name: '경상북도' },
  { id: 15, name: '경상남도' },
  { id: 16, name: '제주특별자치도' },
];

const Write = () => {
  const { postIdeas } = usePostIdeasMutation();

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
    recruitmentPlace: '',
  });

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [get1Depth, set1Depth] = useState(1);
  const [get2Depth, set2Depth] = useState<number[]>([]);

  const writeIdea = () => {
    const cooperationWay = radioValue.cooperationWays.find((cooperationWay) => cooperationWay.checked)?.name;
    const branchIds = checkboxValue.branches.filter((branch) => branch.checked).map((branch) => branch.id);
    const purposeIds = checkboxValue.purposes.filter((branch) => branch.checked).map((purpose) => purpose.id);
    const recruitmentPlace = dropdownValue.recruitmentPlace;

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

    postIdeas({
      title,
      introduce,
      recruitmentPlace,
      cooperationWay,
      branchIds,
      purposeIds,
      teamRecruitmentIds: get2Depth,
    });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleIntroduceChange = (newIntroduce: string) => {
    setIntroduce(newIntroduce);
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
      <Header onClickCheckButton={writeIdea} checkButtonDisabled={true} />

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
            places={places}
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
