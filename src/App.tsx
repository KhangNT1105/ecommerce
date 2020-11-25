import React from 'react';

import Routes from './pages/routes';
import './i18n/i18n';
import withStoreAPIPersist from './api/withStoreAPIPersist';
import withAuthPersist from './stores/AuthenticationStore/withAuthPersist';
import withUIPersist from './stores/UIStore/withUIPersist';
import 'stores/middlewares/logger';
import 'stores/middlewares/persistent';

export const App: React.FC = () => {
  return <Routes />;
};

export default withUIPersist(withAuthPersist(withStoreAPIPersist(App)));
