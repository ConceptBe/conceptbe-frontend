import { Global, ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/fonts/SUIT-Variable.css';
import { globalStyles } from './styles/globalStyles.ts';
import './styles/reset.css';
import theme from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <App />
  </ThemeProvider>,
);
