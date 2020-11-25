import { storiesOf } from '@storybook/react';
import React from 'react';

import TableHeaderTitle from './TableHeaderTitle';

storiesOf('TableHeaderTitle', module)
  .add('default', () => <TableHeaderTitle title="test" />)
  .add('sortable', () => <TableHeaderTitle title="test" sortable={true} sortField="test" />);
