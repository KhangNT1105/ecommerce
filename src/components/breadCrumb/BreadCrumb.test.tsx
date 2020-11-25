import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';

import BreadCrumb from './BreadCrumb';
import { testSnapshots } from '../../utils/test';

const wrapper = (props: any) => (
  <BrowserRouter>
    <BreadCrumb {...props} />
  </BrowserRouter>
);

describe('<BreadCrumb />', () => {
  testSnapshots(wrapper, [
    {
      props: {
        items: [{ label: 'Content' }, { label: 'Shows', path: '/content/shows' }],
        arrowFirst: false
      },
      description: "Dont't have arrow before first item"
    },
    {
      props: {
        items: [{ label: 'Content' }, { label: 'Schedules', path: 'content/schedules' }],
        arrowFirst: true
      },
      description: 'Have arrow before first item'
    }
  ]);
});

describe('BreadCrumb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
    jest.useFakeTimers();
  });

  test('No Submenu', () => {
    const props: any = {
      items: [
        {
          label: 'string',
          path: 'string',
          isVisible: true
        }
      ],
      arrowFirst: false
    };
    const container = mount(
      <BrowserRouter>
        <BreadCrumb {...props} />
      </BrowserRouter>
    );
    const nav = container.find('i.fa-angle-right');
    expect(nav).toHaveLength(0);
  });
});
