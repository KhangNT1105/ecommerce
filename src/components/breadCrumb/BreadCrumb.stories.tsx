import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';

const breadCrumbs = [
  { label: 'Start', path: '/' },
  { label: 'Page Link', path: '/some-link' }
];

storiesOf('BreadCrumb', module)
  .add('default', () => (
    <BrowserRouter>
      <BreadCrumb items={breadCrumbs} arrowFirst={false} />
    </BrowserRouter>
  ))
  .add('with arrowFirst', () => (
    <BrowserRouter>
      <BreadCrumb items={breadCrumbs} arrowFirst={true} />
    </BrowserRouter>
  ));
