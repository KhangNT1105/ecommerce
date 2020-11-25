import React from 'react';
import { testSnapshots } from '../../utils/test';
import IconWithBadge from './IconWithBadge';

describe('<IconWithBadge />', () => {
  testSnapshots(IconWithBadge, [
    {
      props: {
        badgeNumber: 6,
        badgeBackground: 'primary',
        children: <i className="fa fa-bell-o fa-fw" />
      },
      description: 'render snapshot correctly'
    }
  ]);
});
