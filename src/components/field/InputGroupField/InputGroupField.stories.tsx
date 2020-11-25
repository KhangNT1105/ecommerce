import React from 'react';
import * as Yup from 'yup';
import withFormik from 'storybook-formik';
import { storiesOf } from '@storybook/react';

// import Components
import InputGroupField from './InputGroupField';

const textValidationSchema = Yup.object({
  text: Yup.string().required('Is Required Field')
});
const handleFormik = {
  formik: {
    initialValues: {
      text: 'test',
      select_multiple: []
    },
    validationSchema: textValidationSchema
  }
};

storiesOf('InputGroupField', module)
  .addDecorator(withFormik)
  .add(
    'Left Addon',
    () => (
      <InputGroupField
        addonPrependInput="@"
        component="input"
        id="addon-left"
        key="addon-left"
        name="text"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Right Addon',
    () => (
      <InputGroupField
        addonAppendInput="$"
        component="input"
        id="addon-right"
        key="addon-right"
        name="text"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Both Addon',
    () => (
      <InputGroupField
        addonAppendInput=".00"
        addonPrependInput="$"
        component="input"
        id="addon-both"
        key="addon-both"
        name="text"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Disable Input with Addon',
    () => (
      <InputGroupField
        addonPrependInput="@"
        component="input"
        disabled={true}
        id="input-addon-disable"
        key="input-addon-disable"
        name="text"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Both Addon with textarea',
    () => (
      <InputGroupField
        addonAppendInput=".00"
        addonPrependInput="$"
        component="textarea"
        id="addon-both"
        key="addon-both"
        name="text"
        type="textarea"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Both Addon Icon',
    () => (
      <InputGroupField
        addonPrependInput={<i className="fa fa-fw fa-user" />}
        addonAppendInput={<i className="fa fa-fw fa-file-text-o" />}
        component="input"
        id="input-both-addon-icon"
        key="input-both-addon-icon"
        name="text"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Both Addon Icon with textarea',
    () => (
      <InputGroupField
        addonPrependInput={<i className="fa fa-fw fa-user" />}
        addonAppendInput={<i className="fa fa-fw fa-file-text-o" />}
        component="textarea"
        id="addon-both"
        key="addon-both"
        name="text"
        type="textarea"
        value="test"
      />
    ),
    handleFormik
  )
  .add(
    'Both Addon Icon with type=select',
    () => (
      <InputGroupField
        addonPrependInput={<i className="fa fa-fw fa-user" />}
        addonAppendInput={<i className="fa fa-fw fa-file-text-o" />}
        component="select"
        id="select"
        key="select"
        name="text"
      >
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </InputGroupField>
    ),
    handleFormik
  )
  .add(
    'Both Addon Icon with type=select_multiple',
    () => (
      <InputGroupField
        addonPrependInput={<i className="fa fa-fw fa-user" />}
        addonAppendInput={<i className="fa fa-fw fa-file-text-o" />}
        component="select"
        id="select_multiple"
        key="select_multiple"
        name="select_multiple"
        multiple={true}
        type="select"
      >
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
      </InputGroupField>
    ),
    handleFormik
  )
  .add(
    'Both Addon Icon with placeholder',
    () => (
      <InputGroupField
        addonPrependInput={<i className="fa fa-fw fa-user" />}
        addonAppendInput={<i className="fa fa-fw fa-file-text-o" />}
        component="input"
        id="input-checkbox"
        key="placeholder"
        name="text"
        placeholder="Input your name"
        value="test"
      />
    ),
    handleFormik
  );
