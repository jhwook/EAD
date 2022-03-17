import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    beige: string;
    green: string;
    pink: string;
    grey: string;
    white: string;
    black: string;
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
