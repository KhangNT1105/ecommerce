import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { testSnapshots } from 'utils/test';
import Login from './Login';
import { onSubmit } from 'modules/login/loginForm/LoginForm';

jest.mock('localforage');

describe('LoginForm snapshot', () => {
  const renderComp = () => (
    <BrowserRouter>
      <Route>
        <Login />
      </Route>
    </BrowserRouter>
  );
  testSnapshots(renderComp, [
    {
      props: {},
      description: 'Render login form'
    }
  ]);
});

describe('onSubmit Form', () => {
  const values = {
    email: 'user123@gmail.com',
    password: '123123123'
  };
  const props: any = {
    login: jest.fn(),
    failedTimes: 0
  };
  const setErrors = jest.fn();
  const setSubmitting = jest.fn();
  const params: any = {
    setErrors,
    props,
    setSubmitting
  };
  test('submit form', () => {
    try {
      onSubmit(values, params);
    } catch {}
    expect(props.login).toBeCalledWith(values);
  });
});
