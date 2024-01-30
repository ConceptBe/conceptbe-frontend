import { css, keyframes } from '@emotion/react';
import { theme } from 'concept-be-design-system';
import { ComponentPropsWithoutRef } from 'react';

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  width?: string;
  height?: string;
  /**
   * Skeleton 모양
   *
   * @default 'square'
   */
  variant?: 'square' | 'circle';
}

const Skeleton = ({ width = '100%', height = '24px', variant = 'square', className = '', ...rest }: SkeletonProps) => {
  return <div css={genSkeletonStyling(width, height, variant)} className={`skeleton ${className}`} {...rest} />;
};

export default Skeleton;

const skeletonAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const genSkeletonStyling = (width: string, height: string, variant: 'square' | 'circle') => {
  return css({
    width,
    height: variant === 'square' ? height : width,
    borderRadius: variant === 'square' ? '4px' : '50%',

    background: `linear-gradient(-90deg,${theme.color.l2}, ${theme.color.l1}, ${theme.color.l2}, ${theme.color.l1})`,
    backgroundSize: ' 400%',

    animation: `${skeletonAnimation} 5s infinite ease-out`,
  });
};
