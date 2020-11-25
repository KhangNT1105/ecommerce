import BreadCrumb from 'components/breadCrumb/BreadCrumb';
import RoutesString from 'pages/routesString';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductBreadcrumbs } from './ProductBreadcrumb.d';
import './ProductBreadcrumb.scss';

const ProductBreadcrumb: React.FC<ProductBreadcrumbs> = ({ name }) => {
  const { t } = useTranslation();
  const breadCrumbs = [
    { label: t('TRANG_CHU'), path: RoutesString.Home },
    { label: t('SAN_PHAM'), path: RoutesString.Products },
    { label: name }
  ];
  return (
    <div className="productBreadcrumb ">
      <div className="container-fluid">
        <BreadCrumb align="left" items={breadCrumbs} arrowFirst={false} />
      </div>
    </div>
  );
};
export default ProductBreadcrumb;
