import ListProducts from 'components/listProducts/ListProducts';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useCart from 'stores/CartStore/cartStore';
import useProduct from 'stores/ProductStore/productStore';
import { ProductValue } from 'stores/ProductStore/productStore.d';
import './RelatedProducts.scss';

const RelatedProducts: React.FC = () => {
  const [stateProduct] = useProduct();
  const [, cartActions] = useCart();
  const { t } = useTranslation();
  const handleAddToCart = (product: ProductValue) => {
    cartActions.addProduct(product);
  };
  return (
    <div className="relatedProduct">
      <div className="container">
        <ListProducts
          handleAddToCart={handleAddToCart}
          title={t('SAN_PHAM_TUONG_TU')}
          items={stateProduct.listProduct}
        />
      </div>
    </div>
  );
};
export default RelatedProducts;
