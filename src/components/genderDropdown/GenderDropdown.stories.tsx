import { storiesOf } from '@storybook/react';
import React from 'react';

import GenderDropdown from './GenderDropdown';

storiesOf('GenderDropdown', module)
  .add('default', () => <GenderDropdown currentValue="" />)
  .add('with value', () => <GenderDropdown currentValue="Male" />);
