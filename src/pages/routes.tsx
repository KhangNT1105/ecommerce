import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import withLayout from '../components/layout/withLayout';
import AnonymousUserLayout from '../components/layout/AnonymousUserLayout/AnonymousUserLayout';
import Spinner from '../components/spinner/Spinner';
import ErrorBoundary from '../components/ErrorBoundary';
import PageNotFound from './error/PageNotFound';
import RoutesString, { Pages } from './routesString';
// import PrivateRoute from './privateRoute';
import IdleTimerContainer from './idleTimerContainer';
import LoadingContainer from './loadingContainer';
import { DURATION, POSITION } from '../constants/enum';
import { createMarkup } from 'utils/common';

const Routes: React.FC = (): JSX.Element => {
  return (
    <>
      <ErrorBoundary>
        <LoadingContainer />
        <ToastContainer
          autoClose={DURATION.TOAST}
          draggable={false}
          hideProgressBar={true}
          position={POSITION.TOP_CENTER}
          limit={1}
          pauseOnFocusLoss={false}
        />
        <IdleTimerContainer />
        <Switch>
          <Route
            path={RoutesString.Login}
            exact={true}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Login />
              </Suspense>
            )}
          />
          <Route
            path={RoutesString.Demo}
            exact={true}
            component={withLayout(AnonymousUserLayout, () => (
              <Suspense fallback={<Spinner />}>
                <Pages.Demo />
              </Suspense>
            ))}
          />
          <Route
            path={RoutesString.TermAndConditions}
            exact={true}
            component={withLayout(AnonymousUserLayout, () => (
              <Suspense fallback={<Spinner />}>
                <Pages.TermAndConditions />
              </Suspense>
            ))}
          />
          <Route
            path={RoutesString.Home}
            exact={true}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Home />
              </Suspense>
            )}
          />
          <Route
            path={RoutesString.Products}
            exact={true}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Products />
              </Suspense>
            )}
          />
          <Route
            path={RoutesString.Product}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Product />
              </Suspense>
            )}
          />
          <Route
            path={RoutesString.Cart}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Cart />
              </Suspense>
            )}
          />
          <Route
            path={RoutesString.Repair}
            exact={true}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Repair />
              </Suspense>
            )}
          />
          <Route
            path={RoutesString.Checkout}
            exact={true}
            component={() => (
              <Suspense fallback={<Spinner />}>
                <Pages.Checkout />
              </Suspense>
            )}
          />
          <Route key={'page-not-found'} path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </ErrorBoundary>
      <a className="hotline-fixed" href="tel:0902919418">
        <span className="fas fa-phone" />
      </a>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </>
  );
};

export default Routes;
