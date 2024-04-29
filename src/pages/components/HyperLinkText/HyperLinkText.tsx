import styled from '@emotion/styled';
import { Text } from 'concept-be-design-system';

import { ColorKeyType, FontKeyType } from '../../../styles/theme';

interface Props {
  font: FontKeyType;
  color: ColorKeyType;
  lineHeight?: string;
  children: string;
}

const LINK_REG_EXP = /^(https?:\/\/|www\.)/;
const convertHyperLinkTexts = ({ font, color, lineHeight = 'normal', children: text }: Props) => {
  const generatedTexts = text.split('\n').map((line, idx) => {
    if (line === '') return <br key={idx} />;

    if (LINK_REG_EXP.test(line)) {
      return (
        <HyperLink key={idx} as="a" font={font} color={color} lineHeight={lineHeight} href={line} target="_blank">
          {line}
        </HyperLink>
      );
    }

    return (
      <Description key={idx} as="p" font={font} color={color} lineHeight={lineHeight}>
        {line}
      </Description>
    );
  });

  return generatedTexts;
};

const HyperLinkText = (props: Props) => {
  const convertedTexts = convertHyperLinkTexts(props);

  return <>{convertedTexts}</>;
};

export default HyperLinkText;

const Description = styled(Text)<{ lineHeight: string }>`
  line-height: ${({ lineHeight }) => lineHeight};
`;

const HyperLink = styled(Description)`
  color: #448cef;
`;
