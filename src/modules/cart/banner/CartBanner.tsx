import React from 'react';
import { useTranslation } from 'react-i18next';
import './CartBanner.scss';
import bannerImage from 'assets/images/cart/cart.svg';
import BreadCrumb from 'components/breadCrumb/BreadCrumb';
const CartBanner: React.FC = () => {
  const { t } = useTranslation();
  const breadCrumbs = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giỏ hàng', path: '/some-link' }
  ];
  return (
    <div className="cartBanner">
      <div className="cartBanner__img">
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="cartBanner__content">
        <div className="cartBanner__content--breadcrumb">
          <h1>{t('GIO_HANG')} </h1>
          <BreadCrumb arrowFirst={false} items={breadCrumbs} />
        </div>
      </div>
    </div>
  );
};
export default CartBanner;
