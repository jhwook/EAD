import React from 'react';
import ReactDOM from 'react-dom';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
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
    overflow-x: hidden;
    line-height: 1;
    font-family: 'Fira Sans', sans-serif;
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
  a{
    text-decoration: none;
    color: ${(props) => props.theme.black};
    &:hover {
    color: ${(props) => props.theme.pink};
  }
  }
`;

// Login
interface ILoginState {
  isLogin: boolean;
  userInfo: {
    id?: string;
    username?: string;
    email?: string;
    oauth?: boolean;
    money?: number;
    stacks?: boolean[];
    createdAt?: string;
    updateAt?: string;
    __v?: number;
  };
  accessToken: string;
}

interface ILoginActionPros {
  userInfo: object;
  token: string;
  isLogin: boolean;
}

interface IPaymentProps {
  id?: string;
  username?: string;
  email?: string;
  oauth?: boolean;
  money?: number;
  stacks?: boolean[];
  createdAt?: string;
  updateAt?: string;
  __v?: number;
}

const userState: ILoginState = {
  isLogin: false,
  userInfo: {
    id: '1',
    username: 'kim',
    email: 'sad@naver.com',
    oauth: false,
    money: 12,
    stacks: [false],
    createdAt: '1',
    updateAt: '2',
    __v: 0,
  },
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    UserLogin(state, action: PayloadAction<ILoginActionPros>) {
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.token;
      state.isLogin = action.payload.isLogin;
    },
    UserLogout(state) {
      state.userInfo = {};
      state.accessToken = '';
      state.isLogin = false;
    },
    UserModify(state, action: PayloadAction<ILoginActionPros>) {
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.token;
      state.isLogin = action.payload.isLogin;
    },
    UserPayment(state, action: PayloadAction<IPaymentProps>) {
      state.userInfo = action.payload;
    },
  },
});

const postState: any[] = [];

const postSlice = createSlice({
  name: 'post',
  initialState: postState,
  reducers: {
    HomeSearch(state, action: PayloadAction<any>) {
      return [...action.payload];
    },
    inSearch(state, action: PayloadAction<any>) {
      return [...action.payload];
    },
  },
});

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    postData: postSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const { UserLogin, UserLogout, UserModify, UserPayment } =
  userSlice.actions;
export const { HomeSearch, inSearch } = postSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
