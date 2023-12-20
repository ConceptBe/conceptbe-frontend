import '@emotion/react';
import { ColorsType } from './src/styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType;
    typography: TypoType;
  }
}

declare module '@emotion/styled' {
  import styled from '@emotion/styled';
  export * from '@emotion/styled';
  export default styled;
}
