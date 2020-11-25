import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePickerAddonInput from './datePickerAddonInput';

storiesOf('DatePickerAddonInput', module).add('default', () => {
  return <DatePickerAddonInput />;
});
