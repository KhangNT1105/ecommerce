import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

export default { title: 'Header' };

const breadCrumbs = [
  { label: 'Start', path: '/' },
  { label: 'Page Link', path: '/some-link' }
];

const notifications = [
  {
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    status: 'success'
  },
  {
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    status: 'warning'
  },
  {
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    status: 'danger'
  },
  {
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    status: 'primary'
  }
];

const username = 'John';

export const defaultHeader = () => (
  <BrowserRouter>
    <Header breadCrumbs={breadCrumbs} notifications={notifications} username={username} />
  </BrowserRouter>
);
