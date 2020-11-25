import React from 'react';
import { render } from 'enzyme';

import ArtWork from './ArtWork';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (f: any) => f()
}));

const getDataFn = jest.fn();

const defaultDropzoneProps = {
  apiURL: '',
  files: [],
  autoUpload: true,
  config: {
    accept: 'image/*',
    disabled: true,
    noClick: true,
    noKeyboard: true,
    minSize: 0,
    maxSize: 1048576 /* 1 MB */
  }
};

const defaultProps = {
  name: 'artwork',
  title: 'Key Artwork (Arabic)',
  subTitle: 'ARTWORD_SUBTITLE',
  items: [
    {
      title: 'POSTER',
      component: (getMess: any): any => <></>,
      status: true
    }
  ]
};

describe('<ArtWork />', () => {
  it('Render Snapshot Correctly', () => {
    const wrapper = render(<ArtWork {...defaultProps} getData={getDataFn} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render Snapshot Correctly without getData function', () => {
    const wrapper = render(<ArtWork {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
