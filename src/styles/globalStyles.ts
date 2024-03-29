import { css } from '@emotion/react';

export const globalStyles = css`
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #00000066;
    border-radius: 16px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 14px;
    opacity: 0;
  }

  * {
    font-family: 'SUIT Variable', sans-serif;
  }
`;
