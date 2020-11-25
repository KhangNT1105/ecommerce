import React from 'react';
import './ProductsBanner.scss';
import bannerImage from 'assets/images/products/product.svg';
import { useTranslation } from 'react-i18next';
import BreadCrumb from 'components/breadCrumb/BreadCrumb';
const ProductsBanner: React.FC = () => {
  const { t } = useTranslation();
  const breadCrumbs = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Sản phẩm', path: '/some-link' }
  ];
  return (
    <div className="productsBanner">
      <div className="productsBanner__img">
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="productsBanner__content">
        <div className="productsBanner__content--breadcrumb">
          <h1>{t('SAN_PHAM')} </h1>
          <BreadCrumb arrowFirst={false} items={breadCrumbs} />
        </div>
      </div>
    </div>
  );
};
export default ProductsBanner;
