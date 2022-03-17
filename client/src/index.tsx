import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    width: 100%;
    height: 100%;
    line-height: 1;
    font-family: 'Barlow Condensed', sans-serif;
    background-color: ${(props) => props.theme.beige};
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

interface IActionPros {
  type: string;
  id: number;
  payload: object;
}

const initialState = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '웃긴신발', quan: 1 },
  { id: 2, name: '예쁜신발', quan: 0 },
];

const reducer = (state = initialState, action: IActionPros) => {
  switch (action.type) {
    case 'Plus': {
      const copy = [...state];
      copy[action.id].quan += 1;
      return copy;
    }
    case 'Minus': {
      const copyy = [...state];
      copyy[action.id].quan -= 1;
      return copyy;
    }
    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
