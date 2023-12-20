import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { ReactComponent as Filter } from '../../assets/svg/filter.svg';
import { ReactComponent as Write } from '../../assets/svg/writeicon40.svg';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import FilterBox from '../../components/BottomSheet/FilterBox';
import Button from '../../components/Button';
import IdeaCard from '../../components/Card/IdeaCard';
import PopCard from '../../components/Card/PopCard';
import { Header } from '../../components/Header/Header';
import Checkbox, { checkboxOptions } from '../../components/Inputs/Checkbox';
import Dropdown from '../../components/Inputs/Dropdown/Dropdown';
import Radio, { radioOptions } from '../../components/Inputs/Radio';
import NonStyleButton from '../../components/NonStyleButton';
import Spacer from '../../components/Spacer';
import Text from '../../components/Text';
import { filterOptions, filterSubOptions, filterRadio } from '../../modules/constants';

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

//드롭다운
const dropdownItems = [
  { value: '1', text: 'Dropdown item1 asdasddas' },
  { value: '2', text: 'Dropdown item2' },
];

const Feeds = () => {
  const theme = useTheme();
  const [isFilter, setIsFilter] = useState(false);

  // 필터 체크박스
  const [filedOptions, setFiledOptions] = useState<checkboxOptions[] | []>([...filterOptions]); // 분야
  const [purposeOptions, setPurposeOptions] = useState<checkboxOptions[] | []>([...filterSubOptions]); // 목적

  // 필터 라디오
  const [radioOptions, setRadioOptions] = useState<radioOptions[] | []>([...filterRadio]);
  const [selectedRadio, setSelectedRadio] = useState<string>('all');
  const handleOptionChange = (value: string) => {
    setSelectedRadio(value);
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
    console.log(value);
  };

  return (
    <>
      <Header main>
        <Header.Item>
          <Text font={theme.typography.suit22r} color={theme.colors.w1}>
            CONCEPTBE
          </Text>
        </Header.Item>
        <Header.Item>
          <NonStyleButton onClick={() => setIsFilter(true)}>
            <Filter />
          </NonStyleButton>
        </Header.Item>
      </Header>

      <Wrapper>
        <FeedFixBox>
          <Write />

          <FeedFixTextWrapper>
            <Text font={theme.typography.suit22sb} color={theme.colors.w1}>
              일이삼사오육칠팔구십
            </Text>
            <Text font={theme.typography.suit22r} color={theme.colors.w1}>
              님,
            </Text>
          </FeedFixTextWrapper>

          <Text font={theme.typography.suit22r} color={theme.colors.w1}>
            재밌는 아이디어를 들려주세요!
          </Text>
          <Spacer top={10} />

          <Text font={theme.typography.suit15ra} color={theme.colors.w1}>{`아이디어 적으러 가기 >`}</Text>
        </FeedFixBox>

        <FeedBox>
          <Spacer top={16} />

          <FeedWrapper>
            <Text font={theme.typography.suit16sb}>현재 인기 있는 아이디어</Text>
            <Spacer top={18} />
            <FeedFixWrapper>
              {ideas.map((idea, idx) => {
                return <PopCard key={idx} category={idea.category} title={idea.title} />;
              })}
            </FeedFixWrapper>
          </FeedWrapper>
          <Spacer top={40} />

          <FeedWrapper>
            <Text font={theme.typography.suit16sb}>피드 영역 타이틀입니다</Text>
            <Spacer top={18} />
            {Array.from({ length: 20 }, (_, idx) => (
              <IdeaCard key={idx} tags={tags} />
            ))}
          </FeedWrapper>
        </FeedBox>
      </Wrapper>

      <BottomSheet isOpen={isFilter} onClose={() => setIsFilter(false)}>
        <FilterBox>
          <FilterContent>
            <FilterWrapper>
              <Text font={theme.typography.suit15m} color={theme.colors.b9}>
                분야
              </Text>
              <Spacer top={12} />
              <Checkbox options={filedOptions} setState={setFiledOptions} onChange={handleCheckboxChange} />
            </FilterWrapper>

            <FilterWrapper>
              <Text font={theme.typography.suit15m} color={theme.colors.b9}>
                목적
              </Text>
              <Spacer top={12} />
              <Checkbox options={purposeOptions} setState={setPurposeOptions} onChange={handleCheckboxChange} />
            </FilterWrapper>

            <FilterWrapper>
              <Text font={theme.typography.suit15m} color={theme.colors.b9}>
                협업 방식
              </Text>
              <Spacer top={12} />
              <Radio defaultValue="all" options={radioOptions} onChange={handleOptionChange} gap={'large'} />
            </FilterWrapper>

            <FilterWrapper>
              <Text font={theme.typography.suit15m} color={theme.colors.b9}>
                지역
              </Text>
              <Spacer top={12} />
              <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue={'다운'} />
            </FilterWrapper>

            <FilterWrapper>
              <Text font={theme.typography.suit15m} color={theme.colors.b9}>
                팀원 모집
              </Text>
              <Spacer top={12} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue={'다운'} />
                <Dropdown onClick={handleDropdownClick} items={dropdownItems} initialValue={'다운'} />
              </div>
            </FilterWrapper>
          </FilterContent>
          <FilterBottom>
            <Button style={{ flex: 1 }} text={'닫기'} onClick={() => setIsFilter(false)} isActive={false} />
            <Button style={{ flex: 2 }} text={'적용'} onClick={() => {}} isActive={true} />
          </FilterBottom>
        </FilterBox>
      </BottomSheet>
    </>
  );
};

export default Feeds;

const Wrapper = styled.section`
  background-color: ${(props) => props.theme.colors.c1};
  height: 100%;
`;

const FeedFixBox = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${(props) => props.theme.colors.c1};
  color: ${(props) => props.theme.colors.w1};
`;

const FeedFixWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const FeedFixTextWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const FeedBox = styled.div`
  background-color: ${(props) => props.theme.colors.w1};
  border-radius: 16px 16px 0 0;
  padding: 29px 22px 80px 22px;
`;

const FeedWrapper = styled.div``;

const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 22px;
  padding-bottom: 50px;
`;

const FilterBottom = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 7px;
  position: sticky;
  bottom: 0;
  padding: 0 22px 22px;
  background-color: ${({ theme }) => theme.colors.w1};
`;

const FilterWrapper = styled.div``;
