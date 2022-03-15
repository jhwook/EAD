import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme, lightTheme } from './theme';

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
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
