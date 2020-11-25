import * as React from 'react';
import { shallow } from 'enzyme';
import { Row, Col } from 'reactstrap';
import { testSnapshots } from '../../utils/test';

import Tabs from './Tabs';

const defaultProps = {
  active: 'show_information',
  items: [
    {
      name: 'show_information',
      textKey: <Row>Row (reactstrap) Component</Row>,
      component: (
        <>
          <h1>SHOW INFORMATION</h1>
        </>
      )
    },
    {
      name: 'media',
      textKey: <div>Media Div</div>,
      component: (
        <>
          <h2>MEDIA</h2>
        </>
      )
    },
    {
      name: 'clip_playlists',
      textKey: 'CLIP_PLAYLISTS',
      component: (
        <>
          <h3>CLIP PLAYLISTS</h3>
        </>
      )
    },
    {
      name: 'setting',
      textKey: 'SETTING',
      component: (
        <>
          <h4>SETTING</h4>
        </>
      )
    },
    {
      name: 'summary',
      textKey: 'SUMMARY',
      component: <Col>Col (reactstrap) Component</Col>
    }
  ],
  setActiveTab: jest.fn()
};

describe('<Tabs />', () => {
  testSnapshots(Tabs, [
    {
      props: { ...defaultProps },
      description: 'render snapshot correctly with prop active'
    },
    {
      props: { ...defaultProps, active: 'tabs' },
      description: 'render snapshot correctly with prop active is equal name'
    }
  ]);
});

describe('Test Logic', () => {
  const setActiveTab = jest.fn();
  const useStateMock: any = (initState: any) => [initState, setActiveTab];

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should active tab when click nav link', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<Tabs {...defaultProps} />);
    wrapper.find('NavLink').first().simulate('click');
    expect(setActiveTab).toHaveBeenCalledWith(defaultProps.active);
  });
});
