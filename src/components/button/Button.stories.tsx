import React from 'react';

import Button from './Button'; // Relative Import

import { COLOR, SIZE } from '../../constants/enum';

export default { title: 'Button' };

export const withText = () => (
  <Button color={COLOR.PRIMARY} size={SIZE.LARGE}>
    Hello Button{' '}
  </Button>
);
export const withBtnPrimary = () => (
  <Button color={COLOR.PRIMARY} size={SIZE.SMALL}>
    Primary
  </Button>
);

export const withEmoji = () => (
  <Button color={COLOR.PRIMARY}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
