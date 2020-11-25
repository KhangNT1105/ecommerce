import React from 'react';
import { storiesOf } from '@storybook/react';
import DetailBlock from './DetailBlock';

storiesOf('DetailBlock', module)
  .add('default', () => (
    <div style={{ maxWidth: 400 }}>
      <DetailBlock blockTitle="block title">children</DetailBlock>
    </div>
  ))
  .add('without children', () => (
    <div style={{ maxWidth: 400 }}>
      <DetailBlock blockTitle="block title" />
    </div>
  ));
