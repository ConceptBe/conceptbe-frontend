import styled from '@emotion/styled';
import { Divider, Text, theme } from 'concept-be-design-system';
import { ChangeEvent } from 'react';

type Props = {
  title: string;
  introduce: string;
  onTitleChange: (newTitle: string) => void;
  onIntroduceChange: (newIntroduce: string) => void;
};

/**
 * 제목과 내용
 */
const TitleAndIntroduceSection = ({ title, introduce, onTitleChange, onIntroduceChange }: Props) => {
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length > 20) return; // 제목 길이 제한

    onTitleChange(newTitle);
  };

  const handleChangeIntroduce = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newIntroduce = e.target.value;
    if (newIntroduce.length > 2000) return; // 내용 길이 제한

    onIntroduceChange(newIntroduce);
  };

  return (
    <>
      <HeaderInput placeholder="제목을 입력해 주세요 (최대20자)" value={title} onChange={handleChangeTitle} />
      <Divider color="l3" />
      <div>
        <BodyTextarea
          placeholder="내용을 작성해주세요 (최대 2000자)"
          value={introduce}
          onChange={handleChangeIntroduce}
        />

        <TextareaCountBox>
          <Text font="suit15m" color="c1">
            {introduce.length}
          </Text>
          /2,000
        </TextareaCountBox>
      </div>
    </>
  );
};

export default TitleAndIntroduceSection;

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
