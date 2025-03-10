import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '768px',
  tablet: '1023px',
  desktop: '1024px',
};

export const theme: DefaultTheme = {
  beige: '#FFFDF7',
  green: '#BEC6B8',
  pink: '#EDD4B9',
  white: 'whitesmoke',
  black: 'black',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};
