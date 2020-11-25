import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import LoggedInLayout from './LoggedInLayout';

describe('<LoggedInLayout />', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <LoggedInLayout>
        <div>Hi, I'm dashboard</div>
      </LoggedInLayout>
    </BrowserRouter>
  );

  test('render snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
