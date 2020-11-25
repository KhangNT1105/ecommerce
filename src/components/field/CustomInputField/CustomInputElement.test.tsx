import React from 'react';
import { shallow } from 'enzyme';
import { testSnapshots } from '../../../utils/test';
import CustomInputElement from 'components/field/CustomInputField/CustomInputElement';

const event = {
  currentTarget: {
    value: 'abc',
    validity: {
      valid: true
    },
    checked: true
  }
};

let defaultProps: any = {
  id: 'render_custom_checkbox',
  label: 'Custom Input',
  name: 'test',
  type: 'range',
  errorText: ''
};

jest.mock('formik', () => ({
  useField: (name: string) => {
    return [null, { value: 'Test value' }, { setValue: jest.fn() }];
  }
}));

describe('<CustomInputElement />', () => {
  testSnapshots(CustomInputElement, [
    {
      props: {
        id: 'render_custom_checkbox',
        type: 'checkbox'
      },
      description: 'default render'
    },
    {
      props: {
        component: 'input',
        id: 'render_custom_checkbox',
        key: 'render_custom_checkbox',
        label: 'Custom Input',
        name: 'test',
        type: 'checkbox'
      },
      description: 'renders input is Custom Checkbox'
    },
    {
      props: {
        component: 'input',
        id: 'render_custom_disabled_checkbox',
        key: 'render_custom_disabled_checkbox',
        label: 'Custom Input',
        name: 'test',
        type: 'checkbox',
        disabled: true
      },
      description: 'renders input is disabled Custom Checkbox'
    },
    {
      props: {
        component: 'input',
        id: 'render_radio',
        key: 'render_radio',
        label: 'Custom Input',
        name: 'test',
        type: 'radio'
      },
      description: 'renders input is Custom Radio'
    },
    {
      props: {
        component: 'input',
        id: 'render_disabled_radio',
        key: 'render_disabled_radio',
        label: 'Custom Input',
        name: 'test',
        type: 'radio',
        disabled: true
      },
      description: 'renders input is disabled Custom Radio'
    },
    {
      props: {
        component: 'input',
        id: 'render_readonly_radio',
        key: 'render_readonly_radio',
        label: 'Custom Input',
        name: 'test',
        type: 'radio',
        readOnly: true
      },
      description: 'renders input is readOnly Custom Radio'
    }
  ]);
});

describe('Test logic', () => {
  test('should do not on if errorText is not empty', () => {
    const wrapper = shallow(<CustomInputElement {...defaultProps} />);
    wrapper.find('CustomInput').simulate('change', event);
    expect(defaultProps.onChange).toBe(undefined);
  });
  test('call api if have OnChange fn and field valid', () => {
    defaultProps = {
      ...defaultProps,
      onChange: jest.fn()
    };
    const wrapper = shallow(<CustomInputElement {...defaultProps} />);
    wrapper.find('CustomInput').simulate('change', event);
    expect(defaultProps.onChange).toHaveBeenCalledWith(event);
  });
  test('should do not anything if errorText is not empty', () => {
    defaultProps = {
      ...defaultProps,
      errorText: 'field is required'
    };
    const wrapper = shallow(<CustomInputElement {...defaultProps} />);
    wrapper.find('CustomInput').simulate('change', event);
    expect(defaultProps.errorText).toEqual('field is required');
  });
});
