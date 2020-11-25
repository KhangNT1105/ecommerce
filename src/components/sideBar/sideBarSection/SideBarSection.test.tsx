import React from 'react';
import { testSnapshots } from '../../../utils/test';
import { SideBarSection } from './SideBarSection';

describe('<SideBarSection />', () => {
  testSnapshots(SideBarSection, [
    {
      props: {
        fluid: true,
        children: <div>Hi I'm Fluid Sidebar Section</div>
      },
      description: 'Fluid Sidebar section'
    },
    {
      props: {
        cover: true,
        children: <div>Hi I'm Cover Sidebar Section</div>
      },
      description: 'Cover Sidebar section'
    },
    {
      props: {
        cover: true,
        fluid: true,
        children: <div>Hi I'm recommend Sidebar Section</div>
      },
      description: 'Cover and fluid Sidebar section (recommend)'
    }
  ]);
});
