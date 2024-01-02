import '@emotion/react';
import { ColorType, FontType } from './src/styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    color: ColorType;
    font: FontType;
  }
}

declare module '@emotion/styled' {
  import styled from '@emotion/styled';
  export * from '@emotion/styled';
  export default styled;
}
