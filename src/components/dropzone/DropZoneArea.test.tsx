import * as React from 'react';
import { shallow } from 'enzyme';

import { testSnapshots } from '../../utils/test';
import DropZoneArea from './DropZoneArea';

jest.mock('localforage');

const defaultProps = {
  apiURL: '',
  files: [],
  autoUpload: true,
  config: {
    accept: 'image/*',
    disabled: false,
    noClick: false,
    noKeyboard: false,
    minSize: 0,
    maxSize: 1048576 /* 1 MB */
  }
};

describe('<DropZoneArea />', () => {
  testSnapshots(DropZoneArea, [
    {
      props: { ...defaultProps },
      description: 'render snapshot correctly'
    }
  ]);
});

describe('Test logic', () => {
  test('dropzone', () => {
    const wrapper = shallow(<DropZoneArea {...defaultProps} />);
    // console.log(wrapper.find('.dropzone').props());
  });
});
