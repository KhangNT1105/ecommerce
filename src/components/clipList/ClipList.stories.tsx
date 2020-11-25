import React from 'react';
import { storiesOf } from '@storybook/react';

import ClipList from './ClipList';
import { data } from './ClipList.fixtures';

storiesOf('ClipList', module).add('default', () => (
  <ClipList data={data} onSelectDropdown={() => {}} onSelectCell={() => {}} />
));
