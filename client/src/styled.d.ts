import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    beige: string;
    green: string;
    btnGreen: string;
    pink: string;
    grey: string;
    lightGrey: string;
    white: string;
    black: string;
    naver: string;
    google: string;
    kakao: string;
    mobile: string;
    tablet: string;
    desktop: string;
    fontSize: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
      huge: string;
      veryHuge: string;
    };
  }
}
