import React, { Suspense } from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import { testSnapshots } from '../utils/test';
import PrivateRoute, { authPage } from './privateRoute';
import RoutesString, { Pages } from './routesString';

jest.mock('localforage');

describe('PrivateRoute', () => {
  test('redirects to login page', () => {
    const history = createMemoryHistory();
    const {} = render(
      <Router history={history}>
        <PrivateRoute exact={true} path={'/'} component={Pages.Login} />
      </Router>
    );
    expect(history.location.pathname).toBe(RoutesString.Login);
  });
});

const wrapperDefault = () => {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute exact={true} path={RoutesString.Welcome} component={Pages.Login} />
      </Suspense>
    </Router>
  );
};

describe('<LoggedInLayout />', () => {
  testSnapshots(wrapperDefault, [
    {
      props: {},
      description: 'render default layout'
    }
  ]);
});

const wrapperMiscPage = () => {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute
          exact={true}
          path={RoutesString.TermAndConditions}
          component={Pages.TermAndConditions}
          miscPage={true}
        />
      </Suspense>
    </Router>
  );
};

describe('<MiscPagesLayout />', () => {
  testSnapshots(wrapperMiscPage, [
    {
      props: {},
      description: 'render with misc page layout'
    }
  ]);
});

describe('Funcntion Logic', () => {
  const menuItems = [
    'shows',
    'seasons',
    'episodes',
    'clips',
    'playlists',
    'channels',
    'categories',
    'castings',
    'contracts',
    'licensors',
    'schedules',
    'catalogs',
    'usergroups',
    'configuration'
  ];
  test('Authentication page with permission : true', () => {
    expect(authPage('access-denied-403')).toEqual(true);
  });
});
