import { lazy } from 'react';

import { PUBLIC_PAGES } from 'constants/enum';

const Login = lazy(() => import('./login/Login'));
const Demo = lazy(() => import('pages/page-form-validation-async/Demo'));
const TermAndConditions = lazy(() => import('./term/TermAndConditions'));
const AccessDenied = lazy(() => import('./access-denied/AccessDenied'));
const Home = lazy(() => import('./home/HomePage'));
const Products = lazy(() => import('./products/ProductsPage'));
const Product = lazy(() => import('./product/ProductPage'));
const Repair = lazy(() => import('./repair/RepairPage'));
const Cart = lazy(() => import('./cart/CartPage'));
const Checkout = lazy(() => import('./checkout/CheckoutPage'));
export const Pages = {
  Login,
  Demo,
  TermAndConditions,
  AccessDenied,
  Home,
  Products,
  Product,
  Repair,
  Cart,
  Checkout
};

const RoutesString = {
  Welcome: '/',
  Login: `/${PUBLIC_PAGES.NAME.LOGIN}`,
  Demo: '/page-form-validation-async',
  TermAndConditions: `/${PUBLIC_PAGES.NAME.TAC}`,
  AccessDenied: `/${PUBLIC_PAGES.NAME.ACCESS_DENIED}`,
  Home: '/',
  Products: `/${PUBLIC_PAGES.NAME.PRODUCTS}`,
  Product: `/${PUBLIC_PAGES.NAME.PRODUCT}`,
  Repair: `/bao-hanh-va-sua-chua`,
  Cart: `/${PUBLIC_PAGES.NAME.CART}`,
  Checkout: `/${PUBLIC_PAGES.NAME.CHECKOUT}`
};

export default RoutesString;
