import * as React from 'react';
import { shallow } from 'enzyme';

import { testSnapshots } from '../../utils/test';
import ColorPicker from './ColorPicker';

describe('<ColorPicker/>', () => {
  testSnapshots(ColorPicker, [
    {
      description: 'render ColorPicker',
      props: {}
    }
  ]);
});

describe('Hanlders', () => {
  const props = {
    name: 'colorPicker',
    readonly: false,
    onSelect: jest.fn()
  };
  test('handleClick', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<ColorPicker {...props} />);

    wrapper.find('.pick-button').simulate('click');

    expect(setState).toHaveBeenCalledWith(true);
  });
  test('handleChange', () => {
    const setState = jest.fn();
    const useStateMock: any = (initialState: any) => [true, setState];
    const color = {
      hex: '#33cc33'
    };
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<ColorPicker {...props} />);

    const pickerProps: any = wrapper.find('ColorPicker').props();
    pickerProps.onChange(color);

    expect(setState).toHaveBeenCalledWith(color.hex);
    expect(props.onSelect).toHaveBeenCalledWith(props.name, color.hex);
  });
  test('handleClose', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [true, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<ColorPicker {...props} />);

    wrapper.find('.cover-outside').simulate('click');

    expect(setState).toHaveBeenCalledWith(false);
  });
});
