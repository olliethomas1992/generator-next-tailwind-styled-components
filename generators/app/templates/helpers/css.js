import { css } from '@emotion/core';
import theme from '../tailwind';

export const media = Object.keys(theme.views).reduce(
  (accumulator, label) => {
    let prefix =
      typeof theme.views[label] === 'string'
        ? ''
        : 'min-width:'
    let suffix =
      typeof theme.views[label] === 'string' ? '' : 'px'
    accumulator[label] = cls =>
      css`
        @media (${prefix + theme.views[label] + suffix}) {
          ${cls};
        }
      `
    return accumulator
  },
  {}
)
