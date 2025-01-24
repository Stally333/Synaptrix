import 'styled-components'
import { darkTheme } from '../app/styles/theme'

type Theme = typeof darkTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 