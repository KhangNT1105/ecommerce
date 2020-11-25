import React from 'react';
import BlockItem from './BlockItem';
import { storiesOf } from '@storybook/react';

storiesOf('BlockItem', module).add('BlockItem', () => (
  <BlockItem campaignTitle={'campaignTitle'}>campaign content</BlockItem>
));
