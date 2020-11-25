import CustomHeader from 'components/customHeader/CustomHeader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductBreadcrumb from './breadcrumb/ProductBreadcrumb';
import ProductContent from './content/ProductContent';
import './ProductWrapper.scss';
import RelatedProducts from './related/RelatedProducts';
import ProductSummary from './summary/ProductSummary';
import useAPI from 'api/useAPI';
import Config from 'config';

const ProductWrapper: React.FC = () => {
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();

  const initialValue: any = {};
  const { loading, data } = useAPI({
    url: `${Config.API.PRODUCT_SERVICE}/${id}`,
    initialValue,
    loadInitialState: true
  });

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  }, [loading]);

  const updatedData = {
    ...data,
    quantity,
    setQuantity
  };
  return (
    <div className="productWrapper">
      <CustomHeader />
      <ProductBreadcrumb name={data.name} />
      <ProductSummary {...updatedData} />
      <ProductContent />
      <RelatedProducts />
    </div>
  );
};
export default ProductWrapper;
