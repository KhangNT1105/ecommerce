import React from 'react';
import { shallow } from 'enzyme';
import TextField from './TextField';

import { testSnapshots } from '../../utils/test';
import { useField } from 'formik';

jest.mock('formik', () => ({
  useField: jest
    .fn()
    .mockReturnValue([null, { value: 'Test value' }, { setValue: jest.fn() }])
    .mockReturnValueOnce([null, { value: 'Test value', error: true, touched: true }, { setValue: jest.fn() }])
    .mockReturnValueOnce([null, { value: 'Test value', error: true, touched: true }, { setValue: jest.fn() }])
}));

describe('<Text Field />', () => {
  testSnapshots(TextField, [
    {
      props: {
        name: 'Text',
        type: 'text',
        disabled: false,
        addOn: true
      },
      description: 'render text Field which have addOn with invalid'
    },
    {
      props: {
        name: 'Text',
        type: 'text',
        disabled: false
      },
      description: 'render text Field which do not have addOn with invalid'
    },
    {
      props: {
        name: 'Text',
        type: 'text',
        disabled: false
      },
      description: 'render text Field correctly'
    },
    {
      props: {
        name: 'Text',
        type: 'text',
        disabled: true
      },
      description: 'render disabled text Field correctly'
    },
    {
      props: {
        name: 'Text',
        type: 'text',
        disabled: false,
        addOn: true
      },
      description: 'render text Field which have addOn'
    },
    {
      props: {
        name: 'Text',
        type: 'number',
        disabled: false,
        addOn: true
      },
      description: 'render text Field which have addOn and type is number'
    }
  ]);
});

describe('Test Logic', () => {
  test('should call set value when blur text field ', () => {
    const props: any = {
      name: 'Text',
      type: 'text'
    };
    const e = {
      currentTarget: {
        value: 'abc'
      }
    };
    const wrapper = shallow(<TextField {...props} />);
    wrapper.find('Input').simulate('blur', e);
    const getUseField: any = useField({ name: props.name });
    expect(getUseField[2].setValue).toHaveBeenCalledWith(e.currentTarget.value);
  });
  test('should call set value when change text field ', () => {
    const props: any = {
      name: 'Text',
      type: 'text'
    };
    const e = {
      currentTarget: {
        value: 'abc'
      }
    };
    const wrapper = shallow(<TextField {...props} />);
    wrapper.find('Input').simulate('change', e);
    const getUseField: any = useField({ name: props.name });
    expect(getUseField[2].setValue).toHaveBeenCalledWith(e.currentTarget.value);
  });
  test('should call set value when change text field with type is number ', () => {
    const props: any = {
      name: 'Text',
      type: 'number'
    };
    const e = {
      currentTarget: {
        value: 'abc',
        validity: {
          valid: false
        }
      }
    };
    const wrapper = shallow(<TextField {...props} />);
    wrapper.find('Input').simulate('change', e);
    const getUseField: any = useField({ name: props.name });
    expect(getUseField[2].setValue).toHaveBeenCalledWith(e.currentTarget.value);
  });
  test('should call set value when change text field with type is number and valid is true', () => {
    const props: any = {
      name: 'Text',
      type: 'number'
    };
    const e = {
      currentTarget: {
        value: 'abc',
        validity: {
          valid: true
        }
      }
    };
    const wrapper = shallow(<TextField {...props} />);
    wrapper.find('Input').simulate('change', e);
    const getUseField: any = useField({ name: props.name });
    expect(getUseField[2].setValue).toHaveBeenCalledWith(e.currentTarget.value);
  });
});
