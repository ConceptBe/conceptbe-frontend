import { css } from '@emotion/react';

export const globalStyles = css`
  #root {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    /* min-width: 320px; */
    /* height: 100dvh; */
    overflow: hidden;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    user-select: none;
  }

  input {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
  }
  textarea {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    resize: none;
    border: none;
    outline: none;
  }

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
