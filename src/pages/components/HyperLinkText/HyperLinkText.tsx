import styled from '@emotion/styled';
import { Text } from 'concept-be-design-system';

import { ColorKeyType, FontKeyType } from '../../../styles/theme';

interface Props {
  font: FontKeyType;
  color: ColorKeyType;
  lineHeight?: string;
  children: string;
}

const LINK_REG_EXP = /(https?:\/\/|www\.)/;
const convertHyperLinkTexts = ({ font, color, lineHeight = 'normal', children: text }: Props) => {
  const generatedTexts = text.split('\n').map((line, idx) => {
    if (line === '') return <br key={idx} />;

    return (
      <Paragraph as="p" key={idx} font={font} color={color} lineHeight={lineHeight}>
        {line.split(' ').map((word, idx) => {
          const isFirst = idx === 0;

          if (LINK_REG_EXP.test(word)) {
            return (
              <HyperLink as="a" key={idx} href={word} target="_blank" font={font} color={color} lineHeight={lineHeight}>
                {word}
              </HyperLink>
            );
          }

          return <>{isFirst ? word : ` ${word}`}</>;
        })}
      </Paragraph>
    );
  });

  return generatedTexts;
};

const HyperLinkText = (props: Props) => {
  const convertedTexts = convertHyperLinkTexts(props);

  return <Wrapper>{convertedTexts}</Wrapper>;
};

export default HyperLinkText;

const Wrapper = styled.div`
  white-space: pre-wrap;
`;

const Paragraph = styled(Text)<{ lineHeight: string }>`
  line-height: ${({ lineHeight }) => lineHeight};
`;

const HyperLink = styled(Paragraph)`
  color: #448cef;
`;
