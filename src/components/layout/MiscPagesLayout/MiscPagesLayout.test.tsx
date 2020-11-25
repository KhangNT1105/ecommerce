import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { testSnapshots } from '../../../utils/test';
import MiscPagesLayout from './MiscPagesLayout';

const wrapper = (props: any) => (
  <BrowserRouter>
    <MiscPagesLayout {...props}>
      <div>Hi, this is some misc content like about, term, etc.</div>
    </MiscPagesLayout>
  </BrowserRouter>
);

describe('<MiscPagesLayout />', () => {
  testSnapshots(wrapper, [
    {
      props: {},
      description: 'default render'
    }
  ]);
});
