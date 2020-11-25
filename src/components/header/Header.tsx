import React, { useState } from 'react';
import { Navbar, Container, Nav, NavItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import HeaderNotification from './headerNotification/HeaderNotification';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import { HeaderProps } from './Header.d';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import RoutesString from 'pages/routesString';
import useUI from 'stores/UIStore/uiStore';

import './Header.scss';

const Header: React.FC<HeaderProps> = ({ onClickBurgerBtn, breadCrumbs, notifications, username }) => {
  const handleBurgerMenu = () => {
    onClickBurgerBtn && onClickBurgerBtn();
  };

  const { t } = useTranslation();
  const [, actions] = useAuthentication();
  const [storeUI] = useUI();
  const [disabledLogout, setDisabledLogout] = useState(false);
  const history = useHistory();

  const handleLogout = async () => {
    // prevent multiple clicks on logout button
    if (!disabledLogout) {
      setDisabledLogout(true);
      await actions.logout();

      // need to reset location state when user click to log out button
      history.push(RoutesString.Login, {});
    }
  };

  return (
    <Navbar light={true} expand="xs" className="navbar-multi-collapse">
      <Container className="navbar-collapse-wrap" fluid={true}>
        <Nav navbar={true}>
          <NavItem className="mr-3" onClick={handleBurgerMenu}>
            <div className="nav-link">
              <i className="fa fa-bars fa-fw" />
            </div>
          </NavItem>

          {storeUI.sideBar.collapsed && (
            <NavItem className="mr-4">
              <span className="navbar-text px-2 acexis-logo-text">
                <Link to="/">
                  <strong>{t('CMS_TITLE')}</strong>
                </Link>
              </span>
            </NavItem>
          )}
          <NavItem className="d-none d-md-block">
            <span className="navbar-text">
              <Link to="/">
                <i className="fa fa-home" />
              </Link>
            </span>
            <BreadCrumb items={breadCrumbs} arrowFirst={true} />
          </NavItem>
        </Nav>
        <Nav navbar={true} className="ml-auto">
          <HeaderNotification notifications={notifications} />
          <div className="ml-2 d-flex align-items-center">
            <span>{`${t('WELCOME')},`}</span>
            <span className="ml-1 font-weight-bold">{username.substr(0, username.indexOf('@'))}</span>
          </div>
          <NavItem className="ml-2 nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <i className="fa fa-power-off" />
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
