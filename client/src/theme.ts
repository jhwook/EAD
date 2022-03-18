import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '768px',
  tablet: '1023px',
  desktop: '1024px',
};

export const theme: DefaultTheme = {
  beige: '#FFFDF7',
  green: '#BEC6B8',
  btnGreen: '#5A9E7A',
  pink: '#EDD4B9',
  grey: '#B7B7B7',
  white: 'white',
  black: 'black',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  fontSize: {
    tiny: '15px',
    small: '23px',
    medium: '30px',
    large: '40px',
    huge: '60px',
    veryHuge: '70px',
  },
};
