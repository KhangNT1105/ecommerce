import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import SideBar from './SideBar';
import { mockDataSidebar } from './SideBarMenu';
// const userProfile = {
//   avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/tonymillion/128.jpg',
//   name: 'Santos Gislason',
//   jobTitle: 'Senior Tactics Representative'
// // };

storiesOf('SideBar', module).add('default', () => (
  <BrowserRouter>
    <SideBar {...mockDataSidebar} />
  </BrowserRouter>
));
