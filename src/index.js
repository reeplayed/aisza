import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Background from './helpers/Background';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Background />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
