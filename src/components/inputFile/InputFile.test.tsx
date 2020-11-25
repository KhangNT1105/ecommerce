import * as React from 'react';
import { shallow } from 'enzyme';
import { testSnapshots } from '../../utils/test';
import InputFile from './InputFile';

jest.mock('formik', () => ({
  useField: jest
    .fn()
    .mockReturnValue([null, { value: 'Test value' }, { setValue: jest.fn() }])
    .mockReturnValueOnce([null, { value: 'Test value', error: true, touched: true }, { setValue: jest.fn() }])
}));

const defaultProps = {
  name: 'file'
};
describe('<Input File />', () => {
  testSnapshots(InputFile, [
    {
      props: {
        name: 'file',
        disabled: false
      },
      description: 'render button'
    },
    {
      props: {
        name: 'file',
        disabled: true
      },
      description: 'render disabled button'
    },
    {
      props: {
        name: 'file',
        accept: 'accept'
      },
      description: 'render Form Feedback'
    }
  ]);
});

describe('Test logic', () => {
  test('should call set State when input files ', () => {
    const event = {
      currentTarget: {
        files: ['a', 'b', 'c'],
        value: '/file/test',
        dataset: {
          filetype: '.jpg'
        }
      }
    };
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<InputFile {...defaultProps} />);
    wrapper.find('Input').simulate('change', event);
    expect(setState).toHaveBeenCalledWith('.jpg, .jpeg, .gif, .png');
    expect(setState).toHaveBeenCalledWith(false);
    expect(setState).toHaveBeenCalledWith(true);
  });
  test('should not call set State when input files ', () => {
    const event = {
      currentTarget: {
        files: [],
        value: '/file/test',
        dataset: {
          filetype: '.jpg'
        }
      }
    };
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<InputFile {...defaultProps} />);
    wrapper.find('Input').simulate('change', event);
    expect(setState).not.toHaveBeenCalled();
  });

  test('should call set State when input file with validationT  console.log(FileSize)ype and validationSize', () => {
    const event = {
      currentTarget: {
        files: [
          {
            size: 10
          }
        ],
        value: '',
        dataset: {
          filetype: '.jpg'
        }
      }
    };
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = shallow(<InputFile {...defaultProps} />);
    wrapper.find('Input').simulate('change', event);
    expect(setState).toHaveBeenCalledWith(true);
    expect(setState).toHaveBeenCalledWith(true);
  });
});
