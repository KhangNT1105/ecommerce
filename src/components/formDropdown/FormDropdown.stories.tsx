import { storiesOf } from '@storybook/react';
import React from 'react';
import FormDropdown from './FormDropdown';

storiesOf('FormDropdown', module)
  .add('default', () => (
    <div className="w-50">
      <FormDropdown
        placeholder="test"
        currentValue="Male"
        itemList={[
          {
            content: <div>test 1</div>
          },
          {
            content: 'Test'
          }
        ]}
      />
    </div>
  ))
  .add('readonly', () => (
    <div className="w-50">
      <FormDropdown
        placeholder="test"
        currentValue="Male"
        readonly={true}
        itemList={[
          {
            content: <div>test 1</div>
          },
          {
            content: 'Test'
          }
        ]}
      />
    </div>
  ))
  .add('disabled', () => (
    <div className="w-50">
      <FormDropdown
        placeholder="test"
        currentValue="Male"
        disabled={true}
        itemList={[
          {
            content: <div>test 1</div>
          },
          {
            content: 'Test'
          }
        ]}
      />
    </div>
  ));
