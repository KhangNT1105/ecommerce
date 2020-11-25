import React from 'react';
import './CheckoutBanner.scss';
import bannerImage from 'assets/images/checkout/checkout.svg';
import BreadCrumb from 'components/breadCrumb/BreadCrumb';
import { useTranslation } from 'react-i18next';
const CheckoutBanner: React.FC = () => {
  const { t } = useTranslation();
  const breadCrumbs = [{ label: 'Trang chủ', path: '/' }, { label: 'Thanh toán' }];
  return (
    <div className="checkoutBanner">
      <div className="checkoutBanner__img">
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="checkoutBanner__content">
        <div className="checkoutBanner__content--breadcrumb">
          <h1>{t('GIO_HANG')} </h1>
          <BreadCrumb arrowFirst={false} items={breadCrumbs} />
        </div>
      </div>
    </div>
  );
};
export default CheckoutBanner;
