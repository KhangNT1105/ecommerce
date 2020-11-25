import React from 'react';
import { storiesOf } from '@storybook/react';
import IconWithBadge from './IconWithBadge';

storiesOf('IconWithBadge', module)
  .add('with badgeBackground="primary"', () => (
    <IconWithBadge badgeNumber={6} badgeBackground="primary">
      <i className="fa fa-bell-o fa-fw" />
    </IconWithBadge>
  ))
  .add('with badgeBackground="secondary"', () => (
    <IconWithBadge badgeNumber={6} badgeBackground="secondary">
      <i className="fa fa-envelope-o fa-fw" />
    </IconWithBadge>
  ));
