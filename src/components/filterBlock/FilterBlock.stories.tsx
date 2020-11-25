import { storiesOf } from '@storybook/react';
import React from 'react';
import FilterBlock from './FilterBlock';

storiesOf('FilterBlock', module).add('default', () => (
  <FilterBlock filterList={['id', 'name', 'this is a very long item']} />
));
