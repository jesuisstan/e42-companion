import 'styled-components';
import { Theme } from './src/style/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
