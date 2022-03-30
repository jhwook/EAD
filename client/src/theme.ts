import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '768px',
  tablet: '1200px',
  desktop: '1201px',
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
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.mobile} + 1) and (max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  fontSize: {
    micro: '12px',
    tiny: '15px',
    mini: '19px',
    small: '23px',
    medium: '30px',
    large: '40px',
    huge: '60px',
    veryHuge: '70px',
  },
};
