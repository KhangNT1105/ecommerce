import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormikProps, withFormik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { Col, FormGroup, Label, Row } from 'reactstrap';

import { DemoFormProps, DemoFormValues, OtherProps } from 'pages/page-form-validation-async/DemoType';

import Button from 'components/button/Button';
import InputField from 'components/field/InputField/InputField';
import Spinner from 'components/spinner/Spinner';
import DropZoneArea from 'components/dropzone/DropZoneArea';
import DropZonePreview from 'components/dropzone/preview/DropzonePreview';
import LookupField from 'components/lookupField/LookupField';

import { defaultDropzone, defaultDropzonePreviewInit, defaultDropzoneVideo } from 'constants/dropzone';
import {
  checkValueError,
  validateEmail,
  validateRequired,
  validateOnlyAlphaNumeric,
  validateIsUrl
} from 'utils/validation';

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code..
// InjectedFormikProps was artifact of when Formik only exported a HoC.
// It is also less flexible as it MUST wrap all props (it passes them through).
const DemoFormInner = (props: OtherProps & FormikProps<DemoFormValues>) => {
  const { touched, errors, isSubmitting, message, dirty, handleSubmit } = props;
  const { t } = useTranslation();
  const [email, setEmail] = useState('abc');
  const [remember, setRemember] = useState(false);
  const widthLabel = 78;
  const onChange = (e: any) => {
    // some input field may need specific logic for onChange event
    if (e.currentTarget) {
      setEmail(e.currentTarget.value);
    }
  };
  const onChangeChecked = (e: any) => {
    // some input field may need specific logic for onChange event
    if (e.currentTarget) {
      setRemember(e.currentTarget.checked);
    }
  };

  return (
    <div className="login-content">
      {isSubmitting ? <Spinner /> : null}
      <div>
        <h1 className="text-center text-primary">{message}</h1>
        <p className="text-center text-primary">Enter email is admin@acexis.com to see the error from API call</p>
        <FormGroup className="mx-0">
          <Label for="lookup_item" className="col-form-label">
            Lookup Field
          </Label>
          <LookupField
            endpoint={'/'}
            fieldName="name"
            // single={true}
            sort="name,asc"
          />
        </FormGroup>
        <FormGroup className="mx-0">
          <Label for="user_email" className="col-form-label">
            {t('EMAIL_LABEL')}
          </Label>
          <InputField
            component="input"
            errorText={errors.email}
            id="user_email"
            invalid={touched.email && errors.email ? true : false}
            name="email"
            placeholder={t('PLACEHOLDER_EMAIL')}
            touched={touched.email}
            type="email"
            value={email}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup className="mx-0">
          <Label for="user_password" className="col-form-label">
            {t('PASSWORD_LABEL')}
          </Label>
          <InputField
            component="input"
            errorText={errors.password}
            id="user_password"
            invalid={touched.password && errors.password ? true : false}
            name="password"
            placeholder={t('PLACEHOLDER_PASSWORD')}
            touched={touched.password}
            type="password"
            value=""
          />
        </FormGroup>
        <FormGroup className="mx-0">
          <Label for="alpha_numeric" className="col-form-label">
            Only Numeric Alpha
          </Label>
          <InputField
            component="input"
            errorText={errors.alpha_numeric}
            id="alpha_numeric"
            invalid={touched.alpha_numeric && errors.alpha_numeric ? true : false}
            name="alpha_numeric"
            placeholder="Only Numeric Alpha"
            touched={touched.alpha_numeric}
            type="text"
            value="abc123"
          />
        </FormGroup>
        <FormGroup className="mx-0">
          <Label for="is_url" className="col-form-label">
            Is Url
          </Label>
          <InputField
            component="input"
            errorText={errors.is_url}
            id="is_url"
            invalid={touched.is_url && errors.is_url ? true : false}
            name="is_url"
            placeholder="Is Url"
            touched={touched.is_url}
            type="text"
            value=""
          />
        </FormGroup>
        <FormGroup className="mx-0">
          <Label for="upload_image" className="col-form-label">
            Upload Image
          </Label>
          <DropZoneArea {...defaultDropzone}>
            <DropZonePreview {...defaultDropzonePreviewInit} />
          </DropZoneArea>
        </FormGroup>
        <FormGroup className="mx-0">
          <Label for="upload_video" className="col-form-label">
            Upload Video
          </Label>
          <DropZoneArea {...defaultDropzoneVideo}>
            <DropZonePreview {...defaultDropzonePreviewInit} />
          </DropZoneArea>
        </FormGroup>
        <FormGroup className="mx-0">
          <InputField
            checked={remember}
            errorText={errors.remember}
            id="user_remember"
            invalid={touched.remember && errors.remember ? true : false}
            label={t('LABEL_REMEMBER')}
            name="remember"
            type="checkbox"
            onChange={onChangeChecked}
          />
        </FormGroup>

        <Row className="align-items-center">
          <Col style={{ marginLeft: `${widthLabel}px` }}>
            <Link to="/">{t('FORGOT_YOUR_PASSWORD')}</Link>
          </Col>
          <Col className="col-auto">
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting || !isEmpty(errors) || !dirty}
              onClick={handleSubmit}
            >
              {t('LOGIN')}
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const validateFields = {
  email: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD'
    },
    {
      validator: validateEmail,
      code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID'
    }
  ],
  password: [
    {
      validator: validateRequired,
      code: 'FORM_ERROR_REQUIRED_FIELD'
    }
  ],
  alpha_numeric: [
    {
      validator: validateOnlyAlphaNumeric,
      code: 'FORM_ERROR_ALPHA_NUMBERIC_FIELD'
    }
  ],
  is_url: [
    {
      validator: validateIsUrl,
      code: 'FORM_ERROR_IS_URL_FIELD'
    }
  ]
};
// Wrap our form with the withFormik HoC
const DemoForm = withFormik<DemoFormProps & OtherProps, DemoFormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || '',
      remember: false,
      password: ''
    };
  },

  validate: checkValueError(validateFields),
  handleSubmit: (values: DemoFormValues, { setErrors, props }) => {
    // do submit
  }
})(DemoFormInner);

export default DemoForm;
