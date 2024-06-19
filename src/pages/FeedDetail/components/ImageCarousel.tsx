import styled from '@emotion/styled';
import { Flex, Header, SVGHeaderClose24, Spacer, Text } from 'concept-be-design-system';
import { CSSProperties, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLockBodyScroll } from 'react-use';

import { ReactComponent as SVGLeftArrow } from '../assets/leftArrow.svg';
import { ReactComponent as SVGRightArrow } from '../assets/rightArrow.svg';

interface Props {
  imageUrls: string[];
  initialIndex: number;
  onClose: () => void;
}
const arrowStyles: CSSProperties = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 20px)',
  width: 40,
  height: 48,
  cursor: 'pointer',
  background: 'rgba(0, 0, 0, 0.15)',
};

const ImageCarousel = ({ imageUrls, initialIndex, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  useLockBodyScroll();

  return (
    <ModalOverlay onClick={onClose}>
      <Header>
        <Header.Item>
          <button onClick={onClose}>
            <SVGHeaderClose24 />
          </button>
        </Header.Item>
        <Header.Item>
          <Flex>
            <Text font="suit16sb" color="b4">
              이미지 상세보기
            </Text>
            (
            <Text font="suit16sb" color="c1">
              {currentIndex + 1}
            </Text>
            <Text font="suit16sb" color="b4">
              /{imageUrls.length}
            </Text>
            )
          </Flex>
        </Header.Item>
        <Spacer size={24} />
      </Header>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Carousel
          selectedItem={initialIndex}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          onChange={handleChange}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 0 }}>
                <SVGLeftArrow />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 0 }}>
                <SVGRightArrow />
              </button>
            )
          }
        >
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`${index}번째 이미지`} />
            </div>
          ))}
        </Carousel>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageCarousel;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  max-width: 420px;
  height: 100%;
  background: rgba(0, 0, 0, 1);
`;
