import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconEdit from './IconEdit';

storiesOf('IconEdit', module)
  .add('default', () => <IconEdit />)
  .add('handleClick', () => <IconEdit enabled={true} onClick={action('button-click')} />)
  .add('enable', () => <IconEdit enabled={true} />);
