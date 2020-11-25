import * as React from 'react';
import { shallow } from 'enzyme';

import { testSnapshots } from '../../../utils/test';
import DropZonePreview from './DropzonePreview';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (f: any) => f()
}));

const datas = {
  infos: {
    title: '',
    url: 'https://i.pinimg.com/236x/0a/8b/fb/0a8bfb162ef8a917f1e4d4bf5cd08e4c--android-apps-cover-art.jpg',
    size: 0
  }
};

const defaultProps = {
  files: [
    {
      lastModified: 1587457542381,
      name: 'Screen Shot 2020-04-21 at 15.25.27.png',
      path: 'Screen Shot 2020-04-21 at 15.25.27.png',
      size: 93804,
      type: 'image/png',
      webkitRelativePath: ''
    }
  ],
  onFileRemove: jest.fn(),
  onFileUpload: jest.fn()
};

const withData = {
  ...defaultProps,
  status: false,
  datas
};

const withStatusAndData = {
  ...defaultProps,
  status: true,
  datas
};

describe('<DropZonePreview />', () => {
  window.URL.createObjectURL = jest.fn();
  testSnapshots(DropZonePreview, [
    {
      props: { ...withData },
      description: 'Render with data'
    },
    {
      props: { ...withStatusAndData },
      description: 'Render with data and status'
    }
  ]);
});

describe('Test logic', () => {
  test('onFileRemove', () => {
    window.URL.createObjectURL = jest.fn();
    const wrapper = shallow(<DropZonePreview {...withData} />);
    const removeButton = wrapper.find('.dropzone--preview-info i');
    removeButton.simulate('click', defaultProps.files[0]);

    expect(defaultProps.onFileRemove).toHaveBeenCalledWith(defaultProps.files[0]);
  });

  test('onFileUploadHandler', () => {
    window.URL.createObjectURL = jest.fn();
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<DropZonePreview {...withData} />);
    const dropZone = wrapper.find('.dropzone--preview-info');
    dropZone.childAt(2).simulate('click', defaultProps.files[0]);

    expect(setState).toHaveBeenCalledWith(true);
    expect(defaultProps.onFileUpload).toHaveBeenCalledWith(defaultProps.files[0]);
  });
});
