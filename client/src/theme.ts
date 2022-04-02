import { DefaultTheme } from 'styled-components';

const size = {
  iPhone12Pro: '390px',
  mobile: '768px',
  tablet: '1200px',
  desktop: '1201px',
  desktop1: '1600px',
  desktop2: '2000px',
};

export const theme: DefaultTheme = {
  beige: '#FFFDF7',
  green: '#BEC6B8',
  btnGreen: '#5A9E7A',
  pink: '#EDD4B9',
  grey: '#B7B7B7',
  lightGrey: '#C0C6BA',
  white: 'white',
  black: 'black',
  red: '#ff1744',
  naver: '#5EC53A',
  google: '#CF543D',
  kakao: '#FADF4B',
  iPhone12Pro: `(max-width:${size.iPhone12Pro})`,
  mobile: `(min-width: 391px) and (max-width:${size.mobile})`,
  tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop}) and (max-width: 1599px)`,
  desktop1: `(min-width: ${size.desktop1}) and (max-width: 1999px)`,
  desktop2: `(min-width: ${size.desktop2})`,
  fontSize: {
    atom: '5px',
    dust: '8px',
    micro: '12px',
    tiny: '15px',
    mini: '19px',
    small: '23px',
    medium: '30px',
    large: '40px',
    xLarge: '50px',
    huge: '60px',
    veryHuge: '70px',
  },
};
