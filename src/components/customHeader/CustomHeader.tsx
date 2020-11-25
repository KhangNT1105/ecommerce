import React, { useState } from 'react';
import './CustomHeader.scss';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import RoutesString from 'pages/routesString';
import { HeaderProps, NavProps } from './CustomHeader.d';
import { Link, NavLink, useHistory } from 'react-router-dom';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import { Button } from 'reactstrap';
import logo from 'assets/images/header/logo2.png';
import useCart from 'stores/CartStore/cartStore';

const CustomHeader: React.FC<HeaderProps> = ({ color = 'white' }) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [cartState] = useCart();
  const [stateAuthentication, actionsAuthentication] = useAuthentication();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const listNav: NavProps[] = [
    {
      title: t('TRANG_CHU'),
      to: RoutesString.Home
    },
    {
      title: t('GIOI_THIEU'),
      to: '/ASD'
    },
    {
      title: t('SAN_PHAM'),
      to: RoutesString.Products
    },
    {
      title: t('BAO_HANH_SUA_CHUA'),
      to: RoutesString.Repair
    }
  ];
  const userMenu = [
    {
      title: t('DANG_XUAT'),
      handleClick: () => {
        actionsAuthentication.logout();
      }
    }
  ];
  const toggleMenu = () => {
    setIsMenuOpen((value) => !value);
  };
  const renderUserDropdown = () => {
    return userMenu.map((item: any, index: number) => (
      <li key={index} className="text__animation" onClick={item.handleClick}>
        {item.title}
      </li>
    ));
  };
  const handleClickCart = () => {
    push(RoutesString.Cart);
  };
  const changeHeader = () => {
    if (window.scrollY > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const handleClickSignUp = () => {
    push(RoutesString.Login, {
      isLogin: false
    });
  };
  const handleClickLogin = () => {
    push(RoutesString.Login, {
      isLogin: true
    });
  };
  window.addEventListener('scroll', changeHeader);
  const headerClassName = isScrolled ? 'customHeader__container scrolled' : 'customHeader__container';
  const renderNavbar = (listNav: NavProps[]) => {
    return listNav.map((item: NavProps, index: number) => {
      return (
        <div className="navbar__item" key={`${item.title}-${index}`}>
          {item.to && (
            <NavLink activeClassName="active" exact={true} to={item.to} className="navbar__title text__animation">
              {item.title}
            </NavLink>
          )}
          {item.dropdown && (
            <div className="navbar__title text__animation">
              {item.title}
              <div className="navbar__dropdown" />
            </div>
          )}
        </div>
      );
    });
  };
  const menuResponsiveClassName = isMenuOpen ? 'customHeader__menuResponsive active' : 'customHeader__menuResponsive';
  return (
    <header className={`customHeader ${color}`}>
      <div className={headerClassName}>
        <div className="container-fluid ">
          <div className="row customHeader__content">
            <div className="col-5 col-xl-1 customHeader__left" style={{ paddingLeft: 0 }}>
              <div className="customHeader__language">
                <Link to={RoutesString.Home}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="customHeader__iconsResponsive">
                <AiOutlineMenu className="text__animation" onClick={toggleMenu} />
                <FiSearch className="text__animation" />
              </div>
            </div>
            <div className="customHeader__middle col-2 col-xl-7">
              <div className="customHeader__navigation">{renderNavbar(listNav)}</div>
              <div className="customHeader__logoResponsive">
                <Link to={RoutesString.Home}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="customHeader__right col-5 col-xl-4">
              <div className="customHeader__icons">
                <div className="icon user">
                  {stateAuthentication.loggedIn ? (
                    <div className="user__container">
                      <AiOutlineUser className="text__animation" />
                      <div className="user__dropdown">
                        <ul>{renderUserDropdown()}</ul>
                      </div>
                    </div>
                  ) : (
                    <div className="login">
                      <Button onClick={handleClickLogin} className="loginButton">
                        {t('DANG_NHAP')}{' '}
                      </Button>
                      <Button outline={true} onClick={handleClickSignUp} className="signUpButton">
                        {t('DANG_KY')}{' '}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="icon search">
                  <FiSearch className="text__animation" />
                </div>
                <div className="icon cart">
                  <RiShoppingCartLine className="text__animation" onClick={handleClickCart} />
                  {cartState.listCart.length > 0 && <div className="amount">{cartState.listCart.length}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="customHeader__block" />
      <div className={menuResponsiveClassName}>
        <div className="menuResponsive">
          <div className="menuResponsive__buttonExit">
            <span className="buttonExit text__animation" onClick={toggleMenu}>
              x
            </span>
          </div>
          <div className="menuResponsive__listNav">{renderNavbar(listNav)}</div>
        </div>
      </div>
    </header>
  );
};
export default CustomHeader;
