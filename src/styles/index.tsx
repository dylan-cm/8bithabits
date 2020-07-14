import { keyframes } from '@emotion/core'
import { Theme } from './styled'

export const theme: Theme = {
  color: {
    primary: '#545C8A',
    positive: '#000',
    negative: '#fff',
  },
  layout: {
    headerHeightDesktop: '115px;',
  },
  text: {},
}

export interface Component {
  [key: string]: any
}

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
