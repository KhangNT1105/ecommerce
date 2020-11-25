import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { testSnapshots } from '../../utils/test';
import AccessDenied from './AccessDenied';

const Wrapper = (props: any) => (
  <BrowserRouter>
    <AccessDenied {...props} />
  </BrowserRouter>
);

describe('AccessDenied Page', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render AccessDenied Page'
    }
  ]);
});
