import React from 'react';
import * as Yup from 'yup';
import withFormik from 'storybook-formik';
import { storiesOf } from '@storybook/react';

// import Components
import InputField from 'components/field/InputField/InputField';

const textValidationSchema = Yup.object({
  text: Yup.string().required('Is Required Field'),
  email: Yup.string().required('Is Required Field').email()
});
const handleFormik = {
  formik: {
    initialValues: {
      checkbox: false,
      date: '2020-01-01',
      email: 'test@gmail.com',
      file: '',
      radio: false,
      text: 'test',
      select_multiple: []
    },
    validationSchema: textValidationSchema
  }
};

storiesOf('InputField', module)
  .addDecorator(withFormik)
  .add(
    'default',
    () => <InputField component="input" id="input-field" key="default" name="text" value="" />,
    handleFormik
  )
  .add(
    'disable',
    () => <InputField component="input" disabled={true} id="input-field" key="disable" name="text" value="" />,
    handleFormik
  )
  .add(
    'with type=email',
    () => <InputField component="input" id="email" key="email" name="email" type="email" value="" />,
    handleFormik
  )
  .add(
    'with type=select',
    () => (
      <InputField component="select" id="select" key="select" name="text">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </InputField>
    ),
    handleFormik
  )
  .add(
    'with type=select_multiple',
    () => (
      <InputField
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
      </InputField>
    ),
    handleFormik
  )
  .add(
    'with type=file',
    () => <InputField component="input" id="input-field" key="file" name="file" type="file" value="" />,
    handleFormik
  )
  .add(
    'with type=textarea',
    () => <InputField component="textarea" id="input-field" key="textarea" name="text" value="" type="textarea" />,
    handleFormik
  )
  .add(
    'with type=search',
    () => <InputField component="input" id="input-field" key="search" name="text" value="" type="search" />,
    handleFormik
  )
  .add(
    'with type=image',
    () => <InputField component="input" id="input-field" key="image" name="text" value="" type="image" />,
    handleFormik
  )
  .add(
    'with type=number',
    () => <InputField component="input" id="input-field" key="number" name="text" value="" type="number" />,
    handleFormik
  )
  .add(
    'with type=date',
    () => <InputField component="input" id="input-field" key="date" name="date" type="date" value="" />,
    handleFormik
  )
  .add(
    'with type=checkbox',
    () => (
      <InputField
        component="input"
        id="checkbox"
        key="checkbox"
        label="Unchecked Checkbox"
        name="checkbox"
        type="checkbox"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=Disabled Checkbox',
    () => (
      <InputField
        component="input"
        checked={false}
        disabled={true}
        id="input-field"
        key="disabled_checkbox"
        label="Disabled Checkbox"
        name="checkbox"
        type="checkbox"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with placeholder',
    () => (
      <InputField
        component="input"
        id="input-checkbox"
        key="placeholder"
        name="text"
        value=""
        placeholder="Input your name"
      />
    ),
    handleFormik
  );
