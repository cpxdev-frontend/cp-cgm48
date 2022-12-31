import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import {
  BrowserRouter
} from "react-router-dom";
import Snowfall from 'react-snowfall'

ReactDOM.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
    <Snowfall
    color="#fffafa"
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
      snowflakeCount={10}
    />
  </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
