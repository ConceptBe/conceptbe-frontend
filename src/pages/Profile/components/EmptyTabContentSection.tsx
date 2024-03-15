import styled from '@emotion/styled';
import { Spacer, Text } from 'concept-be-design-system';
import { Fragment } from 'react';

type Props = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  textList: string[];
  onClickSVG?: () => void;
};

const EmptyTabContentSection = ({ svg, textList, onClickSVG }: Props) => {
  const SVGElement = svg;

  return (
    <EmptyIdeaSectionContainer>
      <Spacer size="15rem" />
      <EmptyIdeaTextContainer>
        <SVGElement onClick={onClickSVG} cursor={onClickSVG ? 'pointer' : ''} />
        <Spacer size="0.6rem" />
        {textList.map((text, idx) => (
          <Fragment key={idx}>
            <Text font="suit14r" color="ba">
              {text}
            </Text>
            <Spacer size="0.5rem" />
          </Fragment>
        ))}
      </EmptyIdeaTextContainer>
    </EmptyIdeaSectionContainer>
  );
};

export default EmptyTabContentSection;

const EmptyIdeaSectionContainer = styled.div`
  position: relative;
`;

const EmptyIdeaTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
