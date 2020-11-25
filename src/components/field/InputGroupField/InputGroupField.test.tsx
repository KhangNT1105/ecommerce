import React from 'react';
import { testSnapshots } from '../../../utils/test';
import InputGroupField from './InputGroupField';

jest.mock('formik', () => ({
  useField: (name: string) => {
    return [null, { value: 'Test value' }, { setValue: jest.fn() }];
  }
}));

describe('<InputGroupField />', () => {
  testSnapshots(InputGroupField, [
    {
      props: {
        addonPrependInput: '@',
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test'
      },
      description: 'Renders Left Addon input correctly'
    },
    {
      props: {
        addonAppendInput: '$',
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test'
      },
      description: 'Renders Right Addon input correctly'
    },
    {
      props: {
        addonAppendInput: '.00',
        addonPrependInput: '$',
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test'
      },
      description: 'Renders Both Addons correctly'
    },
    {
      props: {
        addonAppendInput: '.00',
        addonPrependInput: '$',
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test',
        touched: true,
        errorText: 'Field is required'
      },
      description: 'Renders Both Addons correctly and show error'
    },
    {
      props: {
        addonAppendInput: '.00',
        addonPrependInput: '$',
        disabled: true,
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test'
      },
      description: 'Renders Disabled Input with Both Addons correctly'
    },
    {
      props: {
        addonAppendInput: '.00',
        addonPrependInput: '$',
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test',
        type: 'textarea'
      },
      description: 'Renders Textarea with Both Addons correctly'
    },
    {
      props: {
        addonAppendInput: '.00',
        addonPrependInput: '$',
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test',
        type: 'select'
      },
      description: 'Renders Select with Both Addons correctly'
    }
  ]);
});
