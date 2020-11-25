import CustomHeader from 'components/customHeader/CustomHeader';
import React, { useEffect } from 'react';
import ProductsBanner from './banner/ProductsBanner';
import ProductsContent from './content/ProductsContent';
import './ProductsWrapper.scss';
import useProduct from 'stores/ProductStore/productStore';

const ProductsWrapper: React.FC = () => {
  const [, actions] = useProduct();
  useEffect(() => {
    actions.getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="products">
      <CustomHeader />
      <ProductsBanner />
      <ProductsContent />
    </div>
  );
};
export default ProductsWrapper;
