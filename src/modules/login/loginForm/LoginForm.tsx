import React from 'react';
import { Form, FormikProps, withFormik, FormikBag } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormGroup, Label, Row } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import './LoginForm.scss';
import Button from 'components/button/Button';
import InputField from 'components/field/InputField/InputField';
import Spinner from 'components/spinner/Spinner';
import {
  checkValueError,
  validateContainAtLeastOneCapitalCharacter,
  validateEmail,
  validateMinLength,
  validateRequired
} from 'utils/validation';
import { LoginFormValues, OtherProps, LoginFormProps } from '../loginTypes';

const LoginFormInner = (props: LoginFormProps & OtherProps & FormikProps<LoginFormValues>) => {
  const { touched, errors, isSubmitting, dirty, values } = props;
  const { t } = useTranslation();

  return (
    <div className="login-content">
      {isSubmitting && <Spinner />}
      <Form>
        <FormGroup row={false} className="mx-0">
          <Label for="user_email" className="col-form-label">
            {t('EMAIL_LABEL')} *
          </Label>
          <InputField
            name="email"
            type="email"
            component="input"
            invalid={touched.email && errors.email ? true : false}
            errorText={errors.email}
            touched={touched.email}
            value={values.email}
            id="user_email"
            placeholder={t('PLACEHOLDER_EMAIL')}
          />
        </FormGroup>
        <FormGroup row={false} className="mx-0">
          <Label for="user_password" className="col-form-label">
            {t('PASSWORD_LABEL')} *
          </Label>
          <InputField
            name="password"
            type="password"
            component="input"
            invalid={touched.password && errors.password ? true : false}
            errorText={errors.password}
            touched={touched.password}
            value={values.password}
            id="user_password"
            placeholder={t('PLACEHOLDER_PASSWORD')}
          />
        </FormGroup>
        <Row className="mx-0 justify-center">
          <Button
            className="signin"
            type="submit"
            color="success"
            disabled={isSubmitting || !isEmpty(errors) || !dirty}
          >
            {t('DANG_NHAP')}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

const validateFields = {
  email: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_REQUIRED'
    },
    {
      validator: validateEmail,
      code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID'
    }
  ],
  password: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_PASSWORD_REQUIRED'
    },
    {
      validator: validateMinLength(8),
      code: 'FORM_ERROR_MIN_LENGTH_NUMBER',
      codeOptions: {
        value: 8
      }
    },
    {
      validator: validateContainAtLeastOneCapitalCharacter,
      code: 'FORM_ERROR_REQUIRED_FIELD_PASSWORD_REQUIRED'
    }
  ]
};

export const onSubmit = async (
  values: LoginFormValues,
  { setErrors, props, setSubmitting }: FormikBag<LoginFormProps & OtherProps, LoginFormValues>
) => {
  setSubmitting(true);
  try {
    await props.login(values);
  } catch (e) {
    setErrors(e);
  } finally {
    setSubmitting(false);
  }
};

const LoginForm = withFormik<LoginFormProps & OtherProps, LoginFormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || '',
      password: ''
    };
  },
  validate: checkValueError(validateFields),
  handleSubmit: onSubmit
})(LoginFormInner);

export default LoginForm;
