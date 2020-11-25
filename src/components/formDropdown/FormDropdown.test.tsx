import React from 'react';
import FormDropdown from './FormDropdown';
import { testSnapshots } from '../../utils/test';

describe('<FormDropdown />', () => {
  testSnapshots(FormDropdown, [
    {
      props: {
        placeholder: 'test'
      },
      description: 'render with empty current value'
    },
    {
      props: {
        placeholder: 'test',
        currentValue: 'Male'
      },
      description: 'render with male current value'
    },
    {
      props: {
        placeholder: 'test',
        currentValue: 'Male',
        itemList: [
          {
            content: <div>test 1</div>
          },
          {
            content: 'Test'
          }
        ]
      },
      description: 'render with male current value'
    },
    {
      props: {
        placeholder: 'test',
        currentValue: 'Male',
        readonly: true,
        itemList: [
          {
            content: <div>test 1</div>
          },
          {
            content: 'Test'
          }
        ]
      },
      description: 'render with male current value'
    }
  ]);
});
