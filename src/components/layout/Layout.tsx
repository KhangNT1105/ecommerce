import React from 'react';

import { MenuItem } from 'constants/types';
import Footer from '../footer/Footer';

import './Layout.scss';

interface Props {
  routes: MenuItem[];
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ routes, children }) => {
  return (
    <div className="layout">
      <main className="layout-main">
        <header className="layout-main-header">Header</header>
        <section className="layout-main-body">{children}</section>
        <footer className="layout-main-footer">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Layout;
