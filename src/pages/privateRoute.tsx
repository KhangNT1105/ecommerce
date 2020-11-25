import React, { Suspense } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import RoutesString from './routesString';
import LoggedInLayout from '../components/layout/LoggedInLayout/LoggedInLayout';
import MiscPagesLayout from '../components/layout/MiscPagesLayout/MiscPagesLayout';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import Spinner from 'components/spinner/Spinner';

import { PUBLIC_PAGES } from 'constants/enum';
import { checkPagePermissisons } from 'utils/permissions';

interface IProps {
  component: React.FC;
  path: string;
  exact?: boolean;
  miscPage?: boolean;
  pageName?: string;
  location?: Location;
}

const renderRoute = (Component: React.FC) => (props: RouteProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};

export const authPage = (page: string, path?: string, userPermissions?: string[], menuItems?: string[]) => {
  const pageItem = Object.entries(PUBLIC_PAGES.NAME).map((key) => {
    if (page === key[1]) {
      return true;
    }
    return false;
  });
  const menuAuth = menuItems?.includes(page);
  const pageAccessibility = checkPagePermissisons(page, path || '', userPermissions || []);
  const returnItem = [...pageItem, menuAuth && pageAccessibility].filter((i) => i);
  return returnItem[0] ? true : false;
};

const PrivateRoute: React.FC<IProps & RouteProps> = ({ component, miscPage, pageName, ...rest }) => {
  const Layout = miscPage ? MiscPagesLayout : LoggedInLayout;
  const [state] = useAuthentication();

  if (!state.loggedIn) {
    return (
      <Redirect
        to={{
          pathname: RoutesString.Login,
          state: { from: rest.location?.pathname }
        }}
      />
    );
  }

  if (
    authPage(`${pageName && pageName.toLowerCase()}`, rest.path, state.user.permissions, state.authenticate.menuItems)
  ) {
    return (
      <Layout>
        <Route {...rest} render={renderRoute(component)} />
      </Layout>
    );
  }

  return <Redirect to={{ pathname: RoutesString.AccessDenied, state: { from: '' } }} />;
};

PrivateRoute.defaultProps = {
  miscPage: false
};

export default PrivateRoute;
