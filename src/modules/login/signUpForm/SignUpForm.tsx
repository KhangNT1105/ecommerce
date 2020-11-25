import React from 'react';
import { Form, FormikProps, withFormik, FormikBag } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormGroup, Label, Row } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import './SignUpForm.scss';
import Button from 'components/button/Button';
import InputField from 'components/field/InputField/InputField';
import Spinner from 'components/spinner/Spinner';
import {
  checkValueError,
  validateEmail,
  validateContainAtLeastOneCapitalCharacter,
  validateMinLength,
  validateRequired
} from 'utils/validation';
import { SignUpFormProps, SignUpOtherProps, SignUpFormValues } from '../loginTypes';

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code..
// InjectedFormikProps was artifact of when Formik only exported a HoC.
// It is also less flexible as it MUST wrap all props (it passes them through).
const SignUpFormInner = (props: SignUpFormProps & SignUpOtherProps & FormikProps<SignUpFormValues>) => {
  const { touched, errors, isSubmitting, dirty } = props;
  const { t } = useTranslation();

  return (
    <div className="signup-content">
      {isSubmitting && <Spinner />}
      <Form>
        <div className="row">
          <div className="col-5 col-lg-12">
            <FormGroup row={false} className="mx-0">
              <Label for="user_firstName" className="col-form-label">
                {t('TEN')} *
              </Label>
              <InputField
                name="firstName"
                type="text"
                component="input"
                invalid={touched.firstName && errors.firstName ? true : false}
                errorText={errors.firstName}
                touched={touched.firstName}
                id="user_firstName"
                placeholder={t('PLACEHOLDER_FIRST_NAME')}
              />
            </FormGroup>
          </div>
          <div className="col-7 col-lg-12">
            <FormGroup row={false} className="mx-0">
              <Label for="user_lastName" className="col-form-label">
                {t('HO_TEN_DEM')} *
              </Label>
              <InputField
                name="lastName"
                type="text"
                component="input"
                invalid={touched.lastName && errors.lastName ? true : false}
                errorText={errors.lastName}
                touched={touched.lastName}
                id="user_lastName"
                placeholder={t('PLACEHOLDER_LAST_NAME')}
              />
            </FormGroup>
          </div>
        </div>
        <FormGroup row={false} className="mx-0">
          <Label for="user_signUp_email" className="col-form-label">
            {t('EMAIL_LABEL')} *
          </Label>
          <InputField
            name="email"
            type="email"
            component="input"
            invalid={touched.email && errors.email ? true : false}
            errorText={errors.email}
            touched={touched.email}
            id="user_signUp_email"
            placeholder={t('PLACEHOLDER_EMAIL')}
          />
        </FormGroup>
        <FormGroup row={false} className="mx-0">
          <Label for="user_signUp_password" className="col-form-label">
            {t('PASSWORD_LABEL')} *
          </Label>
          <InputField
            name="password"
            type="password"
            component="input"
            invalid={touched.password && errors.password ? true : false}
            errorText={errors.password}
            touched={touched.password}
            id="user_signUp_password"
            placeholder={t('PLACEHOLDER_PASSWORD')}
          />
        </FormGroup>
        <Row className="mx-0 justify-center">
          <Button
            className="signup"
            type="submit"
            color="success"
            disabled={isSubmitting || !isEmpty(errors) || !dirty}
          >
            {t('DANG_KY')}
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
  ],
  firstName: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_FIRST_NAME_REQUIRED'
    }
  ],
  lastName: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD_LAST_NAME_REQUIRED'
    }
  ]
};

export const onSubmit = async (
  values: SignUpFormValues,
  { setErrors, props, setSubmitting }: FormikBag<SignUpFormProps & SignUpOtherProps, SignUpFormValues>
) => {
  setSubmitting(true);
  try {
    await props.signUp(values);
  } catch (e) {
    setErrors(e);
  } finally {
    setSubmitting(false);
  }
};

const SignUpForm = withFormik<SignUpOtherProps & SignUpFormProps, SignUpFormValues>({
  mapPropsToValues: () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  },
  validate: checkValueError(validateFields),
  handleSubmit: onSubmit
})(SignUpFormInner);

export default SignUpForm;
