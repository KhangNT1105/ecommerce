import React from 'react';
import { Row, Col } from 'reactstrap';
import { storiesOf } from '@storybook/react';
import withFormik from 'storybook-formik';

import SearchBox from './SearchBox';

const onSubmit = (searchTerm: string) => {};

const inputProps = {
  name: 'search-box',
  placeholder: 'Search for a show by name or id',
  inputType: 'text' as 'text'
};

const inputDebounceProps = {
  name: 'search-box',
  placeholder: 'Search for a show by name or id',
  inputType: 'text' as 'text',
  autoSubmitAfterTime: 600
};

const buttonProps = {
  children: 'Search',
  color: 'success',
  btnType: 'button' as 'button'
};

storiesOf('SearchBox', module)
  .addDecorator(withFormik)
  .add('default', () => {
    return (
      <div>
        <SearchBox inputProps={inputProps} buttonProps={buttonProps} onSubmit={onSubmit} />
      </div>
    );
  })
  .add('Inside another wrapper', () => {
    return (
      <Row>
        <Col xs={6}>
          <SearchBox inputProps={inputProps} buttonProps={buttonProps} onSubmit={onSubmit} />
        </Col>
      </Row>
    );
  })
  .add('Auto submit after times', () => {
    return (
      <Row>
        <Col xs={6}>
          <SearchBox inputProps={inputDebounceProps} buttonProps={buttonProps} onSubmit={onSubmit} />
        </Col>
      </Row>
    );
  });
